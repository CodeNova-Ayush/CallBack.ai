# Callback AI — Architecture & Full Tech Stack Guide

## 1. Full Tech Stack

### Frontend Architecture
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling & Theme**: Tailwind CSS v4, Custom CSS Variables (Warm Ivory `#FAF6F0` base, Terracotta `#C85A32` primary, Dark Espresso `#231F1D` text)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Google Fonts (Inter / Serif display font pairings)
- **PDF Engine**: Native CSS `@media print` with responsive zoom engine and multi-template vector renderers.

### Backend Architecture
- **Server Framework**: Next.js App Router API Routes (`/app/api/...`)
- **API Endpoints**:
  - `POST /api/ai/enhance-bullet` — AI bullet point metrics enhancer
  - `POST /api/agent/[resumeId]/chat` — RAG-grounded conversational candidate agent
  - `POST /api/match` — Job Description parser & keyword gap analyzer
  - `GET /api/verification/[resumeId]` — Public evidence & claim verification scorer
  - `GET/PUT /api/resumes/[id]` — Resume CRUD operations
  - `GET/PUT /api/sections/[id]` & `/api/sections/reorder` — Section drag-and-drop & ordering API

### Database & ORM
- **Database**: SQLite (`dev.db`) for zero-dependency local runs (configurable for PostgreSQL)
- **ORM**: Prisma ORM 5.22
- **Data Models**: User, Resume, ResumeSection, SkillGraph, JobDescription, MatchResult, AnalysisResult, VerificationClaim, EmbeddingChunk, AgentConversation, JobPosting, ApplicationDraft.

### AI & Agentic Intelligence Layer
1. **Living Resume Agent**: RAG-grounded conversational candidate agent with source citations and anti-hallucination guardrails.
2. **Claim Verification Engine**: Specificity scoring & GitHub evidence verification.
3. **Persistent Skill Graph**: Interlinked skill-evidence entity model.
4. **Auto-Tailor Opportunities**: Side-by-side job matching & diff viewer.
5. **Voice Intake Engine**: Natural career history speech parsing.

---

## 2. Directory & Folder Structure

```
buildersprog/
├── app/                          # Next.js App Router (Frontend Pages & Backend APIs)
│   ├── (app)/                    # Main Application Workspace Routes
│   │   ├── agent/[resumeId]/     # Living Candidate Agent RAG Surface
│   │   ├── analyzer/[resumeId]/  # ATS Resume Score & Grammar Fix Surface
│   │   ├── builder/[resumeId]/   # 3-Zone Resume Builder & Template Engine
│   │   ├── dashboard/            # Candidate Dashboard & Resume Manager
│   │   ├── jd-match/[resumeId]/  # Job Description Matcher & Keyword Gap Analysis
│   │   ├── opportunities/        # Tailored Applications & Auto-Apply Surface
│   │   ├── recruiter-dashboard/  # Recruiter Surface & Candidate Agent Chat
│   │   ├── skill-graph/          # Persistent Skill & Evidence Entity Graph
│   │   ├── trust-score/[id]/     # Claim Verification & Trust Score Engine
│   │   └── voice-intake/         # Voice-Native Career Intake Surface
│   ├── (auth)/                   # Authentication Routes (Login, Register)
│   ├── api/                      # Backend API Service Routes
│   │   ├── agent/[resumeId]/     # RAG Agent Chat API Endpoint
│   │   ├── ai/enhance-bullet/    # AI Bullet Enhancement API Endpoint
│   │   ├── match/                # Job Description Matcher API Endpoint
│   │   ├── resumes/              # Resume CRUD API Endpoints
│   │   ├── sections/             # Section Reordering & CRUD API
│   │   └── verification/         # Trust Claim Verification API
│   ├── globals.css               # Global Theme Tokens & Print Stylesheet
│   ├── layout.tsx                # Root App Layout & Font Wrappers
│   └── page.tsx                  # YC-Stage Landing Page
├── components/                   # Reusable UI & Component Architecture
│   ├── builder/                  # 8 Printable ATS Resume Templates Engine
│   │   └── ResumeTemplates.tsx   # Classic ATS, Executive, Navy, Pill, Tech templates
│   ├── nav/                      # Persistent Navigation Components
│   │   └── Sidebar.tsx           # App Sidebar Navigation with User Drawer
│   └── ui/                       # Atomic UI Component Design System
│       ├── Badge.tsx             # Terracotta, Success, Warning Pill Badges
│       ├── Button.tsx            # Full-Rounded Pill Buttons (Primary/Secondary)
│       ├── Card.tsx              # Surface Cards & Container Elevators
│       ├── Input.tsx             # Text Input & Textarea Elements
│       ├── Logo.tsx              # Rich Vector Terracotta Logo Mark
│       └── Modal.tsx             # Interactive Dialog & Template Gallery Modal
├── lib/                          # Core Backend Services & Data Access
│   ├── db/                       # Database Client Instantiation
│   │   └── prisma.ts             # Prisma Client instance
│   └── services/                 # Business Logic & AI Engines
│       ├── ats-scorer.ts         # ATS Parser & Scoring Engine
│       ├── jd-matcher.ts         # Job Description Keyword Matching Engine
│       ├── rag-agent-service.ts  # Grounded RAG Candidate Agent Engine
│       └── verification-service.ts# Trust Score & Claim Verification Engine
├── prisma/                       # Database Configuration & Migration Scripts
│   ├── schema.prisma             # Data Model Definitions (11 Entities)
│   └── seed.ts                   # Realistic Candidate & Recruiter Seed Script
├── public/                       # Static Assets & Images
├── package.json                  # Dependencies & Scripts
├── tsconfig.json                 # TypeScript Compiler Options
└── README.md                     # Project Specification & Overview
```
