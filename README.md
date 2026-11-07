# SHARANG AI — Insurance & Artificial Intelligence Portfolio

> **Tagline**: Bridging Insurance Expertise with Artificial Intelligence.  
> **Slogan**: Experience · Explore · Engage  
> **Master Prompt Reference**: `SHARANG_AI_Master_Build_Prompt.pdf`

A high-performance, full-stack portfolio website showcasing **7.4 years of insurance domain expertise** (Life Insurance, Group Medical Insurance / GMC Underwriting, Group Personal Accident / GPA Underwriting, Advanced Excel) combined with cutting-edge **AI automation and analytics**.

---

## Architecture Overview

SHARANG AI is architected with a strict 7-section single-page experience, a single integrated central AI assistant, and a private owner administration dashboard:

1. **Hero Section** — Futuristic Archer Guardian branding, impactful headline, dual CTA buttons.
2. **About Me** — 7.4-year professional insurance journey, GMC & GPA underwriting focus, and transition into AI solutions.
3. **Expertise** — 7 authentic domain capability cards (GMC, GPA, Operations, Advanced Excel, AI Prompt Engineering, Process Automation, AI in Insurance).
4. **AI Projects Library** — Dynamic, filterable, searchable showcase with category selectors and project deep-dive modals.
5. **SHARANG AI Central Agent** — Integrated futuristic Archer Guardian assistant powered by server-side Gemini API with specialist modes (Underwriting, Claims, Analytics, Automation, Knowledge) and resilient demo mode.
6. **Education & Certifications** — Insurance credentials and continuous AI learning milestones.
7. **Resume & Contact** — Downloadable resume, validated contact form, and direct recruiter links.
8. **Private Owner Admin Dashboard (`/admin`)** — Secured portal to manage AI projects, edit content, and review inquiries.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cyber-navy, neon cyan, electric blue, and gold design tokens
- **Icons & Motion**: Lucide React, Framer Motion
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) + resilient fallback store
- **AI Engine**: Google Gemini API via secure Next.js Server Route Handlers (`/api/chat`)
- **Deployment**: Vercel ready

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ (Node.js 26.x LTS recommended)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local` and add your credentials:
```bash
cp .env.example .env.local
```

| Variable | Description | Required For |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | Production DB / Auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | Production DB / Auth |
| `GEMINI_API_KEY` | Google Gemini API Key | Live AI Assistant |
| `ADMIN_SECRET_KEY` | Fallback Local Admin Passkey | Admin Access fallback |

*Note: If `GEMINI_API_KEY` or Supabase keys are not set, SHARANG AI automatically falls back to an intelligent demonstration mode with pre-seeded projects and domain-aware responses.*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Deploying to Vercel

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SHARANG AI full-stack portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sarang-ai.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add the following **Environment Variables** in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://rehnzcnlktcevrieosnj.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_2bDQg1Xb_xmXq67XJb2IIg_uV5BpqUU`
   - `GEMINI_API_KEY` = `<your-gemini-api-key>`
   - `ADMIN_PASSWORD` = `admin123`
5. Click **Deploy**. Your portfolio will be live at `https://<your-project>.vercel.app`!

---

## Security & Privacy Highlights

- **Server-Side API Key Isolation**: `GEMINI_API_KEY` is strictly confined to Next.js route handlers (`src/app/api/chat/route.ts`). Never exposed to client-side bundles.
- **Row Level Security (RLS)**: Public visitors can only view published projects. Management routes require authenticated session tokens.
- **Fictional Demonstration Data**: All sample underwriting scenarios adhere to regulatory privacy standards; no real client PHI/PII is included.
- **Informational AI Guardrails**: The Sarang AI assistant provides decision-support and educational knowledge, with explicit disclaimers against binding underwriting actions.

---

## Project Status

Refer to [`DEVELOPMENT_CHECKLIST.md`](DEVELOPMENT_CHECKLIST.md) for live phase tracking and testing milestones.
