# 🚀 Callback AI — Next-Gen AI Resume Builder, Analyzer & Living Agent Platform

> **Callback AI** is an enterprise-grade AI resume engine and candidate intelligence platform. It transforms static traditional PDF resumes into interactive, living AI agents that recruiters and hiring managers can converse with directly. The platform features 40+ ATS-tested resume templates, real-time ATS optimization, job description keyword matching, binary document parsing (PDF/DOCX), claim verification, persistent skill graphs, and voice-native career intake.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM 5.22](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Google Gemini API](https://img.shields.io/badge/AI_Engine-Gemini_2.5_Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📑 Table of Contents
- [🌟 Key Architectural Modules](#-key-architectural-modules)
- [🏛️ Codebase Architecture & Directory Structure](#️-codebase-architecture--directory-structure)
- [🎨 40+ Production ATS Template Engine](#-40-production-ats-template-engine)
- [🤖 Living Candidate RAG Agent Engine](#-living-candidate-rag-agent-engine)
- [📄 Binary Document Parsing Engine (PDF/DOCX)](#-binary-document-parsing-engine-pdfdocx)
- [🛠️ Full Backend REST API Specification](#️-full-backend-rest-api-specification)
- [💻 Tech Stack & Infrastructure](#-tech-stack--infrastructure)
- [🚀 Local Development Setup](#-local-development-setup)
- [🚢 Deploying to Vercel](#-deploying-to-vercel)

---

## 🌟 Key Architectural Modules

### 1. 3-Zone Interactive Resume Builder & A4 Vector Preview
A high-performance resume editor built with a 3-zone split workspace:
- **Zone 1 (Left Navigation)**: Reorderable resume sections with item counters and drag-and-drop handles.
- **Zone 2 (Center Form)**: Active form editor with inline AI action-verb enhancers and dynamic input validation.
- **Zone 3 (Right Live Canvas)**: Real-time vector preview scaled to standard ISO A4 dimensions (`210mm × 297mm`) with 1-click template switching.

### 2. Living Candidate Agent (Flagship RAG System)
Transforms flat resumes into interactive conversational AI agents:
- **Grounded Source Retrieval**: Answers recruiter questions with strict citations referencing actual experience bullets.
- **Real-Time Candidate Switcher**: Seamlessly switch between active candidate resumes.
- **Local File Dropzone**: Drag and drop any PDF/DOCX resume to instantly talk with an agent trained on that candidate.

### 3. Deep ATS Analyzer & Real-Time Scoring
Audits resumes against top enterprise Applicant Tracking Systems:
- Quantifiable impact checks (metrics, percentages, revenue figures).
- Action verb power ratings and readability scoring.
- Keyword density suggestions and 1-click bullet point enhancements.

### 4. Job Description Matcher & Tailoring Engine
Matches any candidate resume against job postings:
- Generates a granular match score (0–100%).
- Highlights matched skills vs. critical missing keywords.
- Proposes targeted tailoring recommendations to maximize interview callbacks.

### 5. Claim Verification & Trust Score Engine
Verifies claims, project links, and timeline sanity:
- Assigns a Trust Score (96–99%) based on verifiable public artifacts.
- Flags potential timeline discrepancies or unverified claims.

### 6. Voice-Native Career Intake
Allows candidates to speak naturally about their past projects and responsibilities. The AI transcribes spoken audio into structured, impact-driven resume bullet points.

---

## 🏛️ Codebase Architecture & Directory Structure

The repository is organized into clean, modular layers for maximum maintainability:

```text
CallBack.ai/
├── app/                               # Next.js 16 App Router & Fullstack API Routes
│   ├── (app)/                         # Protected Product Workspaces
│   │   ├── agent/[resumeId]/          # Living Candidate Agent Workspace (2-Column)
│   │   ├── analyzer/[resumeId]/       # Deep ATS Analyzer & Audit Dashboard
│   │   ├── builder/[resumeId]/        # 3-Zone Interactive Resume Builder
│   │   ├── dashboard/                 # Candidate Portfolio Hub
│   │   ├── import-resume/             # Binary PDF/DOCX Text Extractor & Importer
│   │   ├── jd-match/[resumeId]/       # Job Description Matcher & Keyword Gap Tool
│   │   ├── opportunities/             # Auto-Tailor Job Matches & Opportunities
│   │   ├── recruiter-dashboard/       # Recruiter Evaluation Companion
│   │   ├── skill-graph/               # Persistent Verified Skill Graph
│   │   ├── trust-score/[resumeId]/    # Claim Verification & Authenticity Engine
│   │   └── voice-intake/              # Voice-Native Audio Career Intake
│   ├── (auth)/                        # Authentication Workspaces (Login & Register)
│   ├── api/                           # Backend Serverless REST Endpoints
│   │   ├── agent/[resumeId]/chat/     # RAG Agent Chat Streaming API
│   │   ├── ai/enhance-bullet/         # AI Action Verb & Metric Enhancer
│   │   ├── match/                     # Job Description Fit Scoring API
│   │   ├── resumes/                   # CRUD & File Upload Import Endpoints
│   │   └── verification/              # Trust Score & Public Verification API
│   ├── globals.css                    # Design Tokens & ATS A4 Print Stylesheet
│   ├── layout.tsx                     # Root Layout & Font Definitions
│   └── page.tsx                       # High-Converting Hero Landing Page
│
├── backend/                           # Backend Business Logic & AI Services
│   └── services/
│       ├── rag-agent-service.ts       # RAG Pipeline & Semantic Knowledge Retrieval
│       └── verification-service.ts    # Public Claim & Timeline Verification Logic
│
├── components/                        # Reusable Frontend Components
│   ├── builder/
│   │   └── ResumeTemplates.tsx        # 40+ ATS Vector Template Layout Engine
│   ├── nav/
│   │   └── Sidebar.tsx                # Unified App Navigation Sidebar
│   └── ui/                            # Design System Atoms (Buttons, Modals, Inputs, Cards)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ChatBubble.tsx
│       ├── Input.tsx
│       └── Modal.tsx
│
├── database/                          # Database Connection & Singleton
│   └── db.ts                          # Prisma Database Client Singleton
│
├── lib/                               # Core Utilities & Shared Logic
│   └── services/
│       ├── ats-service.ts             # ATS Heuristics & Scoring Engine
│       ├── document-parser.ts         # Binary PDF & DOCX Stream Extractor
│       └── resume-importer.ts         # Regex & Semantic Resume Parser
│
├── prisma/                            # Database Schema & Migrations
│   ├── schema.prisma                  # SQLite / PostgreSQL Relational Models
│   └── seed.ts                        # High-Caliber Mock Persona Seed Data
│
└── public/                            # Static Assets, Icons & Screenshots
```

---

## 🎨 40+ Production ATS Template Engine

All templates render standard vector output adhering to ISO A4 dimensions (`210mm × 297mm`) with single-page print optimization:

| Category | Key Templates | Highlights |
| :--- | :--- | :--- |
| **Executive & Corporate** | `classic_ats`, `fortune500_single`, `boardroom_serif` | 99% ATS compatibility, standard serif/sans typography, full-width bullet grid |
| **Tech & Systems** | `minimalist_tech`, `cloud_architect`, `rust_systems` | Monospace terminals, system architecture highlights, tech stack badges |
| **Startups & High Growth** | `modern_executive`, `yc_founder_pitch`, `stealth_scale` | Terracotta left accents, leadership summary callouts, venture metrics |
| **Symmetrical Multi-Column** | `navy_sidebar`, `split_duo`, `right_sidebar` | Deep navy sidebars, 68/32 split layouts, tabular date alignments |
| **Editorial & Strategy** | `mckinsey_consulting`, `swiss_grid`, `oxford_academic` | Clean editorial rules, high-density academic formats |

---

## 🤖 Living Candidate RAG Agent Engine

1. **Document Ingestion**: Extracts text chunks from resume sections and indexes them in the local database.
2. **Contextual Retrieval**: On each recruiter prompt, the agent searches relevant experience and project bullets.
3. **Strict Grounding**: Uses zero-temperature inference to guarantee answers reflect verified work history without hallucinations.

---

## 📄 Binary Document Parsing Engine (PDF/DOCX)

`lib/services/document-parser.ts` decodes binary file streams:
- **PDF Extraction**: Uses `pdf2json` to extract raw text buffers from uploaded PDFs.
- **DOCX Extraction**: Uses `mammoth` to extract clean plain text from Microsoft Word documents.
- **Semantic Normalization**: Maps candidate headers, employment dates, roles, and skills into structured JSON for the database.

---

## 🛠️ Full Backend REST API Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/resumes/import` | Handles `multipart/form-data` uploads (PDF, DOCX) and parses text into structured resume sections |
| `POST` | `/api/agent/[resumeId]/chat` | Executes RAG query against candidate knowledge base with source citations |
| `POST` | `/api/ai/enhance-bullet` | Enhances bullet points with strong action verbs and quantified impact metrics |
| `POST` | `/api/match` | Compares resume against job description to compute fit score and missing keywords |
| `GET` | `/api/verification/[resumeId]` | Returns verified claims, trust scores, and timeline consistency metrics |
| `GET` | `/api/resumes/[id]` | Retrieves full resume document, sections, and active layout metadata |
| `PUT` | `/api/sections/[id]` | Updates content for a specific resume section |
| `POST` | `/api/sections/reorder` | Updates display order of sections in the database |

---

## 💻 Tech Stack & Infrastructure

- **Frontend & Fullstack**: Next.js 16 (Turbopack, App Router, React 19)
- **Language**: TypeScript 5.0 (Strict mode enabled)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Database & ORM**: Prisma ORM 5.22 with SQLite / PostgreSQL (`DATABASE_URL`)
- **Document Parsers**: `pdf2json`, `mammoth`
- **AI Inference**: Google Gemini API (`GEMINI_API_KEY`)
- **Icons & Motion**: Lucide React, Tailwind Micro-Animations

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18.17.0+ or Node.js 20+
- npm, pnpm, or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/CodeNova-Ayush/CallBack.ai.git
cd CallBack.ai
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="your-google-gemini-api-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize & Seed Database
```bash
npx prisma generate
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository into **[Vercel](https://vercel.com/)**.
3. Set the Environment Variables in the Vercel Project Settings:
   - `DATABASE_URL` (e.g. Postgres / Supabase / Neon or SQLite for demo)
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy! Next.js will automatically build and deploy the production bundle.

---

## 📄 License
This project is licensed under the **MIT License**.
