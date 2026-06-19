#!/bin/bash
# One-time setup script for Oracle Cloud Always Free VM (Ubuntu 22.04 ARM)
# Run as: bash scripts/setup-oracle-vm.sh

set -e

echo "==> Installing Docker..."
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker "$USER"

echo "==> Installing Docker Compose plugin..."
sudo apt-get update -qq
sudo apt-get install -y docker-compose-plugin git

echo "==> Cloning portfolio (skip if already cloned)..."
if [ ! -d "$HOME/MyPortfolio" ]; then
  git clone https://github.com/rajeshwari-golande/MyPortfolio.git "$HOME/MyPortfolio"
fi
cd "$HOME/MyPortfolio"

if [ ! -f .env ]; then
  echo "==> Creating .env from template..."
  cp .env.production.example .env
  echo ""
  echo "IMPORTANT: Edit .env before starting:"
  echo "  nano .env"
  echo "  Set: PUBLIC_URL, NEXT_PUBLIC_API_URL, POSTGRES_PASSWORD, GEMINI_API_KEY, CORS_ORIGINS"
  echo ""
fi

echo "==> Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Log out and back in (for docker group)"
echo "  2. cd ~/MyPortfolio && nano .env"
echo "  3. docker compose -f docker-compose.prod.yml up -d --build"
echo "  4. Open http://YOUR_VM_IP in browser"
echo ""
echo "Optional — auto-start on reboot:"
echo "  sudo cp scripts/portfolio.service /etc/systemd/system/"
echo "  sudo systemctl enable portfolio && sudo systemctl start portfolio"
