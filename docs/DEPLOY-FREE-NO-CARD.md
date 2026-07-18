# Free Deployment (No Credit Card)

Deploy the full portfolio without Oracle Cloud or a credit card.

| Service | Hosts | Free? | Card? |
|---------|-------|-------|-------|
| **Vercel** | Next.js frontend | Yes | No |
| **Neon** | PostgreSQL database | Yes | No |
| **Render** | FastAPI backend (Docker) | Yes | No |

> **Trade-off:** Render free tier sleeps after ~15 min idle. First visit after sleep takes ~30–60 seconds to wake.

---

## Step 1 — Deploy frontend on Vercel

1. Go to [vercel.com/signup](https://vercel.com/signup) → **Continue with GitHub**
2. **Add New Project** → import `rajeshwari-golande/MyPortfolio`
3. Set **Root Directory** to `frontend`
4. Add environment variable (temporary, update in Step 4):
   - `NEXT_PUBLIC_API_URL` = `http://localhost:8000`
5. Click **Deploy**
6. Save your URL: `https://your-app.vercel.app`

---

## Step 2 — Create PostgreSQL on Neon

1. Go to [neon.tech](https://neon.tech) → **Sign up with GitHub**
2. **New Project** → name: `portfolio`
3. Copy the **Pooled connection string** (includes `?sslmode=require`)
4. Save it — this is your `DATABASE_URL` (keep it secret)

---

## Step 3 — Deploy backend on Render

1. Go to [render.com](https://render.com) → **Get Started for Free** → sign up with GitHub
2. **New** → **Blueprint** → connect repo `rajeshwari-golande/MyPortfolio`
3. Render reads `render.yaml` and creates the API service
4. Set environment variables in Render dashboard:

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | Neon connection string from Step 2 |
| `GEMINI_API_KEY` | From [Google AI Studio](https://aistudio.google.com/apikey) |
| `CORS_ORIGINS` | Your Vercel URL, e.g. `https://your-app.vercel.app` |
| `CONTACT_TO_EMAIL` | Your real inbox (e.g. college or Gmail) |
| `WEB3FORMS_ACCESS_KEY` | Free key from [web3forms.com](https://web3forms.com) *(easiest)* |
| `RESEND_API_KEY` | Optional alternative from [resend.com](https://resend.com) |

5. Wait for deploy (~5–10 min first time)
6. Save your API URL: `https://myportfolio-api.onrender.com`

Test: open `https://myportfolio-api.onrender.com/health` → should show `{"status":"healthy"}`

---

## Step 4 — Connect frontend to backend

1. Vercel → your project → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_API_URL` to your Render URL:
   ```
   https://myportfolio-api.onrender.com
   ```
3. **Deployments** → **Redeploy** (required — API URL is baked in at build time)

---

## Step 5 — Verify everything

| URL | Expected |
|-----|----------|
| `https://your-app.vercel.app` | Portfolio homepage |
| `https://your-app.vercel.app/blog` | Blog posts list |
| `https://your-app.vercel.app` → Contact form | Success message |
| AI chat button | Responds (needs `GEMINI_API_KEY`) |

---

## Updating the site later

Push to GitHub `main` branch:
- **Vercel** auto-redeploys frontend
- **Render** auto-redeploys backend

```bash
git add .
git commit --author="Rajeshwari Golande <rajeshwari-golande@users.noreply.github.com>" -m "Update portfolio"
git push origin main
```

---

## Security checklist

- Never commit `.env`, `backend/.env`, or real API keys
- Set secrets only in Vercel / Neon / Render dashboards
- Use `.env.deploy.example` as a template only

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blog/contact empty | Check Render is awake; visit `/health` first |
| CORS error in browser | `CORS_ORIGINS` must exactly match Vercel URL (https, no trailing slash) |
| API works, frontend doesn't call it | Redeploy Vercel after changing `NEXT_PUBLIC_API_URL` |
| Database error | Use Neon **pooled** URL with `sslmode=require` |
| Slow first load | Normal on Render free tier (cold start) |

---

## Alternative: Oracle Cloud (requires credit card)

For 24/7 Docker Compose on one VM, see [ORACLE-FREE-DEPLOY.md](./ORACLE-FREE-DEPLOY.md).
