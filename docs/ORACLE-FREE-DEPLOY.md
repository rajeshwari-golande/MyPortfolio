# Free Container Deployment — Oracle Cloud Always Free

Deploy the full portfolio stack (Next.js + FastAPI + PostgreSQL + Caddy) on a **$0/month forever** VM.

**Repo:** [github.com/rajeshwari-golande/MyPortfolio](https://github.com/rajeshwari-golande/MyPortfolio)

---

## Architecture

```
Internet :80/:443
       ↓
   Caddy (reverse proxy)
    ├── /        → frontend:3000  (Next.js)
    └── /api/*   → backend:8000   (FastAPI)
                        ↓
                   postgres:5432   (internal only)
```

---

## What you need

| Item | Cost |
|------|------|
| Oracle Cloud account | Free (card verification, no charge in free tier) |
| Gemini API key | Free tier at [Google AI Studio](https://aistudio.google.com/apikey) |
| Domain (optional) | ~$10/year — or use VM IP only |

---

## Step 1 — Create Oracle Cloud account

1. Go to [cloud.oracle.com/free](https://www.oracle.com/cloud/free/)
2. Sign up and verify your account

---

## Step 2 — Create a free VM

1. Oracle Console → **Compute** → **Instances** → **Create Instance**
2. **Name:** `portfolio-server`
3. **Image:** Ubuntu 22.04 (aarch64)
4. **Shape:** `VM.Standard.A1.Flex` (Ampere ARM)
   - OCPUs: **2**
   - RAM: **12 GB**
5. **Networking:** Assign a **public IPv4 address**
6. **SSH key:** Paste your public SSH key
7. Click **Create**

> If you get **"Out of host capacity"**, try another availability domain or retry later. This is common on Oracle free tier.

---

## Step 3 — Open firewall ports

### Oracle Cloud Security List (required)

1. **Networking** → **Virtual Cloud Networks** → your VCN → **Security Lists**
2. Add **Ingress Rules:**
   - Port **22** — SSH (your IP)
   - Port **80** — HTTP (0.0.0.0/0)
   - Port **443** — HTTPS (0.0.0.0/0)

### Ubuntu firewall (on the VM)

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## Step 4 — SSH into the VM and run setup

```bash
ssh ubuntu@YOUR_VM_PUBLIC_IP
```

```bash
curl -fsSL https://raw.githubusercontent.com/rajeshwari-golande/MyPortfolio/main/scripts/setup-oracle-vm.sh | bash
```

Log out and back in (for Docker group):

```bash
exit
ssh ubuntu@YOUR_VM_PUBLIC_IP
```

---

## Step 5 — Configure environment

```bash
cd ~/MyPortfolio
cp .env.production.example .env
nano .env
```

**Example using VM IP only (no domain):**

```env
PUBLIC_URL=http://150.136.12.34
NEXT_PUBLIC_API_URL=http://150.136.12.34
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=MyStr0ngP@ssw0rd2026!
POSTGRES_DB=portfolio
GEMINI_API_KEY=AIzaSy...your_key
CORS_ORIGINS=http://150.136.12.34
# DOMAIN=   (leave empty for IP-only)
```

Replace `150.136.12.34` with your actual VM public IP.

---

## Step 6 — Build and start containers

```bash
cd ~/MyPortfolio
docker compose -f docker-compose.prod.yml up -d --build
```

First build takes **5–10 minutes**. Check status:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

---

## Step 7 — Verify

Open in browser:

| URL | Expected |
|-----|----------|
| `http://YOUR_VM_IP` | Portfolio homepage |
| `http://YOUR_VM_IP/api/blog/` | JSON blog posts |
| `http://YOUR_VM_IP/health` | `{"status":"healthy"}` |
| `http://YOUR_VM_IP/docs` | FastAPI Swagger docs |

---

## Step 8 — Auto-start on reboot (set and forget)

```bash
sudo sed -i "s|/home/ubuntu/MyPortfolio|$HOME/MyPortfolio|g" scripts/portfolio.service
sudo cp scripts/portfolio.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable portfolio
sudo systemctl start portfolio
```

After a VM reboot, all containers start automatically.

---

## Optional — Custom domain + free HTTPS

1. Point your domain A record to the VM public IP
2. Update `.env`:

```env
PUBLIC_URL=https://rajeshwarigolande.dev
NEXT_PUBLIC_API_URL=https://rajeshwarigolande.dev
CORS_ORIGINS=https://rajeshwarigolande.dev
DOMAIN=rajeshwarigolande.dev
ACME_EMAIL=your@email.com
```

3. Rebuild frontend (API URL is baked in at build time):

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Caddy obtains a free Let's Encrypt certificate automatically.

---

## Useful commands

```bash
# View logs
docker compose -f docker-compose.prod.yml logs -f backend

# Restart all services
docker compose -f docker-compose.prod.yml restart

# Pull latest code and redeploy
cd ~/MyPortfolio
git pull
docker compose -f docker-compose.prod.yml up -d --build

# Database backup
docker compose -f docker-compose.prod.yml exec db \
  pg_dump -U portfolio portfolio > backup_$(date +%Y%m%d).sql

# Free disk space (Docker images accumulate)
docker system prune -af
```

---

## Local dev vs production

| | Local | Production |
|---|-------|------------|
| Compose file | `docker-compose.yml` | `docker-compose.prod.yml` |
| Entry point | `:3000` frontend, `:8000` backend | `:80` via Caddy |
| Postgres exposed | Yes (`5432`) | No (internal only) |
| HTTPS | No | Yes (with domain) |

**Local (when Docker Desktop is installed):**

```bash
docker compose up --build
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site not loading | Check Oracle security list ports 80/443 |
| Frontend loads, API fails | Rebuild: `NEXT_PUBLIC_API_URL` must match public URL |
| AI chatbot not working | Set `GEMINI_API_KEY` in `.env`, restart backend |
| Out of disk space | `docker system prune -af` |
| Containers not starting after reboot | Enable `portfolio.service` (Step 8) |

---

## Cost summary

| Resource | Monthly cost |
|----------|-------------|
| Oracle A1 VM (2 OCPU, 12 GB) | **$0** |
| Block storage (200 GB free) | **$0** |
| Egress (10 TB/month free) | **$0** |
| **Total** | **$0/month** |

This is the [Oracle Always Free tier](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) — not a trial.
