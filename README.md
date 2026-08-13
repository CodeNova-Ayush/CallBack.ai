# Callback AI — Autonomous Living Candidate Agent & Next-Gen Resume System

> **Transforming static candidate resumes into RAG-grounded, claim-verified, living AI candidate agents.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)

---

## 🌟 Executive Overview

**CallBack.ai** is a YC-stage candidate platform and autonomous agent system. Instead of sending static PDF resumes to black-hole ATS parsers, Callback.ai converts every resume into a living digital candidate asset.

Recruiters and hiring managers can converse directly with your **Living Candidate Agent** — asking deep technical questions (*"What was Alex's biggest latency optimization achievement?"*, *"Show experience with Next.js & PgVector"*) and receiving 100% grounded responses with explicit source citations and zero hallucination.

---

## 📷 High-Resolution Showcase & Feature Gallery

### 1. Production Landing Page
![1. Landing Page Showcase](public/screenshots/01-landing-page.png)
*Interactive landing page featuring full template gallery showcase, feature breakdown, live agent preview tab, and quick trial launchpad.*

---

### 2. Candidate Workspace Dashboard
![2. Candidate Dashboard](public/screenshots/02-candidate-dashboard.png)
*Central candidate dashboard displaying active resumes, average ATS score (94/100), claim trust verification (96% verified), template selection, and 1-click ATS audit launcher.*

---

### 3. Full-Viewport 3-Zone Resume Builder & Multi-Template Engine
![3. 3-Zone Resume Builder](public/screenshots/03-resume-builder.png)
*Drag-and-drop section ordering, real-time A4 printable preview, template switching (Modern Executive, Classic ATS, Minimalist Tech, Midnight Navy Sidebar), and metric bullet enhancement.*

---

### 4. Living Candidate RAG Agent (Flagship Feature)
![4. Living Candidate RAG Agent](public/screenshots/05-rag-candidate-agent.png)
*Conversational agent backed by vector embeddings and strict RAG grounding. Answers recruiter queries with explicit source citations and anti-hallucination guardrails.*

---

### 5. ATS Analyzer & Grammar Improvement Engine
![5. ATS Analyzer & Grammar Engine](public/screenshots/04-ats-analyzer.png)
*Instant ATS compatibility scoring, parser formatting checklist, readability index, and inline 1-click action verb & metric phrasing suggestions.*

---

### 6. Recruiter Companion & Candidate Evaluation Surface
![6. Recruiter Companion](public/screenshots/06-recruiter-dashboard.png)
*Recruiter-facing workspace allowing hiring teams to evaluate candidates, run instant technical Q&A, review verification claims, and schedule interviews.*

---

### 7. Claim Verification & Trust Score Engine
![7. Trust Score & Verification Claims](public/screenshots/07-claim-verification.png)
*Per-claim verification badges (Verified, Unverifiable, Inconsistent), timeline sanity checks, and public evidence linking (e.g. GitHub repos, degree records).*

---

### 8. Persistent Skill Graph
![8. Persistent Skill Graph](public/screenshots/08-skill-graph.png)
*Interlinked skill entity network mapping technical skills, proficiency signals, and supporting resume evidence.*

---

### 9. Voice-Native Career Intake
![9. Voice Career Intake](public/screenshots/09-voice-intake.png)
*Voice speech parsing that transcribes spoken career stories into structured resume sections and skill node data.*

---

### 10. Auto-Tailor Opportunities & Application Snapshots
![10. Opportunities & Application Tailoring](public/screenshots/10-opportunities-tailor.png)
*Match resumes against live job postings, generate custom application snapshots, and review modifications in a side-by-side diff viewer.*

---

## 🏗️ System Architecture

```mermaid
graph TD
    A["User / Candidate / Recruiter"] --> B["Next.js 16 App Router"]
    B --> C["Clerk Auth & Session"]
    B --> D["Next.js Server Actions & API Routes"]
    D --> E["Prisma ORM 5.22"]
    E --> F[("SQLite / PostgreSQL Database")]
    D --> G["RAG Agentic Intelligence Engine"]
    G --> H["PgVector / Embedding Chunks"]
    G --> I["Grounded Q&A & Citation Scorer"]
    D --> J["ATS Scorer & Parser"]
    D --> K["Verification & Trust Engine"]
```

---

## 💻 Tech Stack Specification

| Component | Technology | Version / Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js App Router | `16.2.11` with Turbopack |
| **Language** | TypeScript | `5.0` (Strict Mode) |
| **Styling** | Tailwind CSS | `v4.0` with Warm Ivory (`#FAF6F0`) & Terracotta (`#C85A32`) |
| **Icons** | Lucide React | `lucide-react` vector set |
| **ORM** | Prisma ORM | `5.22.0` |
| **Database** | SQLite | `dev.db` (compatible with PostgreSQL) |
| **Auth** | Clerk SDK | `@clerk/nextjs` |
| **Animation** | Framer Motion & Confetti | `framer-motion`, `canvas-confetti` |
| **PDF Engine** | Native CSS `@media print` | Responsive printable A4 renderer |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js `>= 18.0.0`
- npm `>= 9.0.0`

### 1. Clone & Install
```bash
git clone https://github.com/CodeNova-Ayush/CallBack.ai.git
cd CallBack.ai
npm install
```

### 2. Prepare & Seed Database
```bash
npx prisma generate
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
```

### 3. Launch Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live app.

---

## 📜 Available Scripts

- `npm run dev` — Launch Next.js dev server on `http://localhost:3000`
- `npm run build` — Sync Prisma schema, seed database, and compile production bundle
- `npm run start` — Run production server
- `npm run lint` — Execute ESLint syntax check
- `npx tsx prisma/seed.ts` — Re-seed database with realistic candidate & recruiter demo data

---

## 📄 License & Attribution

© 2026 Callback AI. All rights reserved. Built with Next.js 16, TypeScript, Tailwind CSS, and Prisma ORM.
