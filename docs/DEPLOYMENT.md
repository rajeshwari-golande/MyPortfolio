# AWS Deployment Guide

This guide covers deploying the portfolio platform on AWS EC2 with PostgreSQL and S3 storage.

## Architecture on AWS

```
Internet → Route 53 → EC2 (Nginx) → Docker Compose
                                      ├── Frontend (Next.js :3000)
                                      ├── Backend (FastAPI :8000)
                                      └── PostgreSQL (:5432)
                                      
S3 Bucket ← Resume PDFs, Project Screenshots, ML Artifacts
```

## Prerequisites

- AWS account with EC2 and S3 access
- Domain name (optional, for SSL)
- Gemini API key
- SSH key pair for EC2 access

## Step 1: Launch EC2 Instance

1. Go to AWS Console → EC2 → Launch Instance
2. **AMI:** Ubuntu Server 22.04 LTS
3. **Instance type:** t3.medium (2 vCPU, 4 GB RAM)
4. **Key pair:** Create or select an existing SSH key
5. **Security group rules:**
   - SSH (22) — Your IP only
   - HTTP (80) — 0.0.0.0/0
   - HTTPS (443) — 0.0.0.0/0
6. **Storage:** 30 GB gp3
7. Launch the instance

## Step 2: Connect and Install Dependencies

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Log out and back in for group changes
exit
```

## Step 3: Deploy Application

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Clone repository
git clone <your-repo-url> portfolio
cd portfolio

# Configure environment
cp backend/.env.example backend/.env
nano backend/.env
# Set GEMINI_API_KEY and update CORS_ORIGINS to your domain

# Build and start
docker compose up -d --build

# Verify services
docker compose ps
curl http://localhost:8000/health
curl http://localhost:3000
```

## Step 4: Configure Nginx Reverse Proxy

```bash
sudo apt install nginx certbot python3-certbot-nginx -y

sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL with Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

## Step 5: S3 Setup for Static Assets

```bash
# Create S3 bucket
aws s3 mb s3://rajeshwari-portfolio-assets --region us-east-1

# Upload resume
aws s3 cp frontend/public/resume/rajeshwari-golande-resume.pdf \
  s3://rajeshwari-portfolio-assets/resume/

# Upload project screenshots
aws s3 sync frontend/public/projects/ \
  s3://rajeshwari-portfolio-assets/projects/
```

### IAM Role for EC2 (Recommended)

Instead of hardcoding AWS credentials, attach an IAM role to your EC2 instance:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::rajeshwari-portfolio-assets/*"
    }
  ]
}
```

## Step 6: Production Environment Variables

Update `docker-compose.yml` or create a `.env` file at the project root:

```env
GEMINI_API_KEY=your_production_key
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

For production, update the frontend build arg:

```yaml
frontend:
  build:
    args:
      NEXT_PUBLIC_API_URL: https://yourdomain.com
```

## Monitoring and Maintenance

### View Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### Database Backup
```bash
docker compose exec db pg_dump -U portfolio portfolio > backup_$(date +%Y%m%d).sql
```

### Update Deployment
```bash
git pull origin main
docker compose up -d --build
```

### Restart Services
```bash
docker compose restart
```

## Cost Estimate (Monthly)

| Service | Specification | Estimated Cost |
|---------|--------------|----------------|
| EC2 t3.medium | On-demand | ~$30 |
| EBS 30 GB | gp3 | ~$3 |
| S3 | < 1 GB storage | ~$1 |
| Route 53 | 1 hosted zone | ~$0.50 |
| **Total** | | **~$35/month** |

## Troubleshooting

**Frontend can't reach backend:**
- Verify `NEXT_PUBLIC_API_URL` matches your domain
- Check CORS_ORIGINS in backend `.env`
- Ensure Nginx proxy rules are correct

**Database connection failed:**
- Wait for PostgreSQL health check to pass
- Check `DATABASE_URL` format
- Verify Docker network connectivity: `docker compose exec backend ping db`

**AI assistant not working:**
- Verify `GEMINI_API_KEY` is set
- Check backend logs for FAISS index build errors
- Fallback mode works without API key (keyword-based responses)

**SSL certificate issues:**
- Ensure domain DNS points to EC2 public IP
- Run `sudo certbot renew --dry-run` to test auto-renewal
