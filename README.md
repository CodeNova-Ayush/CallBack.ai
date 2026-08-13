<div align="center">

# 🤙 CallBack.ai
### *Next-Gen AI Resume Builder, ATS Analyzer & Grounded Living Candidate Agent*

[![Next.js](https://img.shields.io/badge/Next.js-16_Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0_Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Clerk Auth](https://img.shields.io/badge/Clerk_Auth-v7-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Production Ready](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com/CodeNova-Ayush/CallBack.ai)

<p align="center">
  <b>CallBack.ai</b> transforms static resumes into dynamic, living career assets. It ships a 3-zone resume builder with 15+ ATS-safe templates, real Clerk authentication, uploaded-resume intelligence, a grounded Living Resume Agent, ATS scoring, JD matching, trust verification, persistent skill graph evidence, and recruiter-facing candidate review surfaces.
</p>

[✨ View Demo](#-application-walkthrough--visual-showcase) •
[🚀 Quickstart](#-quickstart--local-installation) •
[📦 Architecture](#-directory--architecture-structure) •
[🔌 REST APIs](#-rest-api-endpoint-reference) •
[🌐 Deploy to Vercel](#-production-deployment-guide)

---

</div>

## 📑 Table of Contents
- [🌟 Key Innovations & Feature Matrix](#-key-innovations--feature-matrix)
- [🖼️ Application Walkthrough & Visual Showcase](#-application-walkthrough--visual-showcase)
  - [1. YC-Stage Landing Page](#1-yc-stage-landing-page)
  - [2. Candidate Executive Dashboard](#2-candidate-executive-dashboard)
  - [3. 3-Zone Interactive ATS Resume Builder](#3-3-zone-interactive-ats-resume-builder)
  - [4. 100-Point ATS Resume Scorer & Analyzer](#4-100-point-ats-resume-scorer--analyzer)
  - [5. Grounded RAG Candidate Agent Chat](#5-grounded-rag-candidate-agent-chat)
  - [6. Recruiter Candidate Inspection Workspace](#6-recruiter-candidate-inspection-workspace)
  - [7. Trust Score & Claim Verification Engine](#7-trust-score--claim-verification-engine)
  - [8. Persistent Skill & Evidence Graph](#8-persistent-skill--evidence-graph)
  - [9. Voice-Native Career Intake Engine](#9-voice-native-career-intake-engine)
  - [10. Auto-Tailor Opportunities & Diff Inspector](#10-auto-tailor-opportunities--diff-inspector)
- [📦 Directory & Architecture Structure](#-directory--architecture-structure)
- [🗄️ Database & Prisma ERD Schema](#-database--prisma-erd-schema)
- [🔌 REST API Endpoint Reference](#-rest-api-endpoint-reference)
- [🚀 Quickstart & Local Installation](#-quickstart--local-installation)
- [🌐 Production Deployment Guide](#-production-deployment-guide)
- [🛡️ Security & Privacy](#-security--privacy)

---

## 🌟 Flagship Features

| Feature Module | Technology Stack | Core Capabilities |
| :--- | :--- | :--- |
| **15+ ATS Template Builder** | Next.js / React / CSS Print | Live 3-zone builder with professional templates, per-resume template switching, zoom preview, and browser PDF export. |
| **Resume Import Intelligence** | Next.js API Routes / Parsers | Upload or paste old resumes, normalize sections, extract skills, seed analysis results, and unlock every workspace route for the imported resume ID. |
| **Living Resume Agent** | Grounded RAG Service | Answers recruiter questions using only the uploaded resume context and returns source citations from candidate sections. |
| **ATS Analyzer** | Heuristic ATS Scorer | Scores structure, readability, missing sections, formatting risks, and grammar/impact opportunities. |
| **JD Matcher** | Keyword Gap Engine | Compares resume content against job descriptions, highlights missing skills, and recommends targeted edits. |
| **Trust Verification** | Claim Specificity Engine | Converts resume bullets into verification claims with status, evidence source, confidence note, and specificity score. |
| **Persistent Skill Graph** | Prisma / Evidence Graph | Stores extracted skills with proficiency signals and evidence snippets for the signed-in candidate. |
| **Recruiter Companion** | Candidate Review Workspace | Gives recruiters candidate summaries, trust score context, and agent-driven inspection workflows. |
| **Voice Career Intake** | Browser Voice UI | Lets users capture career achievements conversationally and convert them into structured resume content. |
| **Clerk Live Authentication** | Clerk / Next.js 16 Proxy | Uses `proxy.ts`, `ClerkProvider`, protected app layout, live sidebar user state, and real Clerk sign-out. |

## ✅ Current Deploy-Ready Result

- Next.js 16-compatible Clerk request wiring is active in `proxy.ts`.
- The authenticated app shell is protected in `app/(app)/layout.tsx` with `await auth.protect()`.
- The sidebar reads live Clerk user/session state and signs out through Clerk.
- The landing page now surfaces the 15+ template library instead of the older 4-theme message.
- Production build passes with a deploy-safe system font stack.

---

## 🖼️ Application Walkthrough & Visual Showcase

### 1. YC-Stage Landing Page
High-conversion landing page with the autonomous candidate agent pitch, live workspace mockup, and 15+ template-library callout.

![YC Landing Page](public/screenshots/01-landing-page.png)

---

### 2. Candidate Executive Dashboard
Authenticated candidate hub showing active resumes, ATS scores, trust signals, import entry points, and quick action launchers.

![Candidate Dashboard](public/screenshots/02-candidate-dashboard.png)

---

### 3. 3-Zone Interactive ATS Resume Builder
Three-pane workspace with editable sections, live preview, template switching, resume-data normalization, zoom controls, and PDF print export.

![3-Zone Builder](public/screenshots/03-resume-builder.png)

---

### 4. 100-Point ATS Resume Scorer & Analyzer
ATS audit surface for structure, readability, missing sections, formatting warnings, and actionable grammar/impact suggestions.

![ATS Analyzer](public/screenshots/04-ats-analyzer.png)

---

### 5. Grounded RAG Candidate Agent Chat
Living Resume Agent that answers only from the selected/uploaded resume and attaches source citations to reduce hallucination risk.

![RAG Candidate Agent](public/screenshots/05-rag-candidate-agent.png)

---

### 6. Recruiter Candidate Inspection Workspace
Recruiter-facing workspace for reviewing candidate fit, inspecting trust score context, and launching candidate-agent conversations.

![Recruiter Dashboard](public/screenshots/06-recruiter-dashboard.png)

---

### 7. Trust Score & Claim Verification Engine
Claim verification engine that turns resume bullets into evidence-backed claims with specificity scoring and confidence notes.

![Trust Verification](public/screenshots/07-claim-verification.png)

---

### 8. Persistent Skill & Evidence Graph
Candidate skill graph populated from imported resume skills and connected to evidence snippets for each proficiency signal.

![Skill Graph Matrix](public/screenshots/08-skill-graph.png)

---

### 9. Voice-Native Career Intake Engine
Voice intake surface for turning spoken achievements into structured resume bullets and skill graph inputs.

![Voice Career Intake](public/screenshots/09-voice-intake.png)

---

### 10. Auto-Tailor Opportunities & Diff Inspector
Opportunity matching hub for scoring job fit, identifying missing keywords, and preparing targeted application drafts.

![Opportunities Matcher](public/screenshots/10-opportunities-tailor.png)

---

## 📦 Directory & Architecture Structure

The repository enforces a clean, modular full-stack architecture separated into clear frontend, backend, database, and system layers:

```
buildersprog/
├── app/                          # Next.js 16 App Router (Views & Server APIs)
│   ├── (app)/                    # Main Application Workspace Routes
│   │   ├── agent/[resumeId]/     # Living Candidate RAG Agent Chat Surface
│   │   ├── analyzer/[resumeId]/  # ATS Resume Audit & Grammar Surface
│   │   ├── builder/[resumeId]/   # 3-Zone Builder & Template Switcher
│   │   ├── dashboard/            # Candidate Executive Dashboard
│   │   ├── import-resume/        # PDF Resume Parser & Import Hub
│   │   ├── jd-match/[resumeId]/  # Job Description Keyword Matcher
│   │   ├── opportunities/        # Tailored Opportunities & Diff Inspector
│   │   ├── recruiter-dashboard/  # Recruiter Workspace & Candidate Search
│   │   ├── skill-graph/          # Persistent Skill & Evidence Matrix
│   │   ├── trust-score/[id]/     # Claim Verification & Specificity Scorer
│   │   └── voice-intake/         # Voice-Native Career History Parser
│   ├── (auth)/                   # Authentication Routes (Login, Register)
│   ├── api/                      # Backend REST API Service Endpoints
│   │   ├── agent/[resumeId]/     # RAG Agent Chat Endpoint
│   │   ├── ai/enhance-bullet/    # AI Bullet Enhancement Endpoint
│   │   ├── match/                # Job Description Parser API Endpoint
│   │   ├── resumes/              # Resume CRUD Endpoints
│   │   ├── sections/             # Section CRUD & Drag-and-Drop Reorder API
│   │   └── verification/         # Trust Claim Verification Endpoint
│   ├── globals.css               # Design System CSS Tokens & Print Engine
│   ├── layout.tsx                # Root App Layout & Font Wrappers
│   └── page.tsx                  # YC-Stage Landing Page
├── backend/                      # Core Backend Services & Business Logic
│   └── services/                 # Core Intelligence Engines
│       ├── ats-scorer.ts         # ATS Parser & 100-Point Scorer Engine
│       ├── jd-matcher.ts         # Job Description Keyword Matcher Engine
│       ├── rag-agent-service.ts  # Grounded RAG Candidate Agent Engine
│       └── verification-service.ts# Trust Score & Specificity Audit Engine
├── components/                   # Reusable UI & Component Design System
│   ├── builder/                  # 8 Printable Vector ATS Resume Templates
│   │   └── ResumeTemplates.tsx   # Classic, Modern, Executive, Pill, Tech renderers
│   ├── nav/                      # App Navigation Architecture
│   │   └── Sidebar.tsx           # Navigation Drawer with User Profile Drawer
│   └── ui/                       # Atomic Component Library
│       ├── Badge.tsx             # Terracotta, Success, Warning Pill Badges
│       ├── Button.tsx            # Rounded Pill Buttons (Primary/Secondary)
│       ├── Card.tsx              # Surface Cards & Container Elevators
│       ├── ChatBubble.tsx        # Candidate Agent Chat Message Bubbles
│       ├── Input.tsx             # Text Input & Textarea Elements
│       ├── Logo.tsx              # Vector Terracotta Brand Mark
│       ├── Modal.tsx             # Interactive Dialog & Template Gallery
│       └── Tabs.tsx              # Multi-View Workspace Navigation Tabs
├── database/                     # Database Singleton & Pool Manager
│   └── db.ts                     # Prisma Client Singleton Instantiation
├── frontend/                     # Static HTML & Prototype Surfaces
│   ├── index.html                # Static Landing Prototype
│   ├── builder.html              # Static Builder Prototype
│   ├── dashboard.html            # Static Dashboard Prototype
│   ├── agent.html                # Static Agent Chat Prototype
│   ├── recruiter.html            # Static Recruiter Prototype
│   ├── trust.html                # Static Trust Score Prototype
│   ├── css/styles.css            # Base Stylesheet
│   └── js/app.js                 # Prototype Interaction Handler
├── lib/                          # Shared Utilities & Service Adapters
│   ├── auth/                     # Clerk Auth Helpers & User Store
│   ├── db/                       # Database Client Exports
│   └── services/                 # Service Wrappers & Text Extraction
├── prisma/                       # Database Configuration & Seeds
│   ├── schema.prisma             # Data Model Definitions (11 Relational Entities)
│   └── seed.ts                   # Realistic Candidate & Recruiter Seed Script
├── public/                       # Static Assets & Screenshots
│   └── screenshots/              # High-Res Application Surface Screenshots
├── proxy.ts                      # Next.js Middleware Proxy (Clerk Auth Routing)
├── .env.example                  # Environment Variable Configuration Template
├── README.md                     # Official Project Specification Guide
├── PROJECT_STRUCTURE.md         # Full Technical Architecture Documentation
└── package.json                  # Dependencies & Deployment Scripts
```

---

## 🗄️ Database & Prisma ERD Schema

The database model is managed via Prisma ORM and features 11 core relational entities:

```mermaid
erDiagram
    User ||--o{ Resume : "owns"
    User ||--o{ SkillGraph : "maintains"
    User ||--o{ JobDescription : "creates"
    Resume ||--o{ ResumeSection : "contains"
    Resume ||--o{ AnalysisResult : "has"
    Resume ||--o{ MatchResult : "generates"
    Resume ||--o{ VerificationClaim : "audits"
    Resume ||--o{ EmbeddingChunk : "vectors"
    Resume ||--o{ AgentConversation : "chats"
    JobPosting ||--o{ ApplicationDraft : "applies"

    User {
        string id PK
        string email
        string name
        string role
    }

    Resume {
        string id PK
        string userId FK
        string title
        boolean isActive
    }

    ResumeSection {
        string id PK
        string resumeId FK
        string sectionType
        int order
        string content
    }

    VerificationClaim {
        string id PK
        string resumeId FK
        string claimText
        string status
        int specificityScore
    }
```

---

## 🔌 REST API Endpoint Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/resumes` | Fetch all resumes for the authenticated user |
| `POST` | `/api/resumes` | Create a new resume instance |
| `GET` | `/api/resumes/[id]` | Get detailed resume by ID with sections |
| `PUT` | `/api/resumes/[id]` | Update resume metadata and active status |
| `POST` | `/api/resumes/import` | Parse PDF resume text into structured sections |
| `POST` | `/api/resumes/[id]/analyze` | Run 100-point ATS scoring audit |
| `POST` | `/api/sections/reorder` | Update drag-and-drop section ordering |
| `POST` | `/api/match` | Compare resume against Job Description |
| `POST` | `/api/agent/[resumeId]/chat` | Stream RAG candidate agent response |
| `GET` | `/api/verification/[resumeId]` | Fetch claim verification & trust score |
| `POST` | `/api/ai/enhance-bullet` | AI metric & impact bullet generator |

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js `v18.0.0+`
- npm `v9.0.0+`

### Step 1: Clone Repository
```bash
git clone https://github.com/CodeNova-Ayush/CallBack.ai.git
cd CallBack.ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure `.env` contains your Clerk keys and DB string:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="ai-resume-builder-secret-key-production"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

### Step 4: Run Database Migrations & Seed Data
```bash
# Push database schema
npx prisma db push

# Seed realistic demo data (Candidates, Resumes, Claims & Recruiter)
npm run seed
```

### Step 5: Start Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment Guide

### Deploying to Vercel (Recommended)
1. Push code to your GitHub repository (`CodeNova-Ayush/CallBack.ai`).
2. Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. Add Environment Variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL` (`file:./dev.db` or PostgreSQL connection string)
4. Click **Deploy**. Vercel will automatically run `npm run build` (which includes `prisma generate`).

---

## 🛡️ Security & Privacy

- **Secret Protection**: All secret keys (`.env`, `.env.local`) are strictly excluded via `.gitignore`.
- **Authentication**: Route middleware (`proxy.ts`) protects candidate workspaces using Clerk authentication.
- **RAG Grounding**: The candidate agent engine uses RAG grounding to prevent hallucinations.

---

<div align="center">

Crafted with ❤️ by **Ayush Mishra** • [GitHub Repository](https://github.com/CodeNova-Ayush/CallBack.ai)

</div>
