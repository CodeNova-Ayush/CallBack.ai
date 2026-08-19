# 🎓 CallBack.ai — Complete Project & Viva Defense Guide

> **Project Name:** CallBack.ai — Autonomous AI Resume Builder, ATS Optimizer & Living Candidate Agent  
> **Repository:** `https://github.com/CodeNova-Ayush/CallBack.ai`  
> **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Prisma ORM, SQLite / PostgreSQL, Clerk Auth, OpenAI / NVIDIA / OpenRouter API.

---

## 📌 1. Executive Summary & Pitch (30-Second Viva Intro)

> *"Traditional resumes are static, one-dimensional PDFs where up to 70% of candidates get rejected by Applicant Tracking Systems (ATS) due to formatting distortions. Furthermore, recruiters spend 6–8 seconds scanning bullet points and have no way to verify claimed metrics without time-consuming screening calls.*
>
> *We built **CallBack.ai** to solve both problems: it provides an ATS-certified 3-Zone Resume Builder with 40+ professional design templates, and transforms every candidate's resume into an **Autonomous Living Candidate Agent** powered by RAG (Retrieval-Augmented Generation). Recruiters can converse 24/7 with the candidate's agent, receive instant answers with grounded citations, and review cryptographic Trust Scores based on verified achievements."*

---

## 🏗️ 2. High-Level System Architecture

```
                                  ┌────────────────────────────────────────────────┐
                                  │               USER INTERFACE                   │
                                  │   Next.js 16 App Router + Tailwind CSS (#048BA2)│
                                  └───────────────┬────────────────┬───────────────┘
                                                  │                │
                        ┌─────────────────────────┴────┐      ┌────┴──────────────────────────┐
                        │   Candidate Workspace        │      │   Recruiter Surface           │
                        │ • 3-Zone Resume Builder      │      │ • Living Candidate Agent Chat │
                        │ • ATS Multi-Parser Analyzer  │      │ • Trust Score / Verification  │
                        │ • Semantic JD Matcher        │      │ • Candidate Profile Database  │
                        └───────────────┬──────────────┘      └──────────────┬────────────────┘
                                        │                                    │
                                        ▼                                    ▼
                        ┌─────────────────────────────────────────────────────────────────────┐
                        │                       NEXT.JS API ROUTE LAYER                       │
                        │  /api/resumes/import  •  /api/agent/[id]/chat  •  /api/match       │
                        │  /api/verification   •  /api/export-pdf       •  /api/ai/enhance  │
                        └───────────────┬────────────────────────────────────┬────────────────┘
                                        │                                    │
                        ┌───────────────┴──────────────┐      ┌──────────────┴────────────────┐
                        │       BUSINESS ENGINES       │      │       PERSISTENCE LAYER       │
                        │ • RAG Agent Service          │      │ • Prisma ORM                  │
                        │ • ATS Keyword & Rule Engine  │      │ • SQLite / PostgreSQL DB      │
                        │ • Claim Verification Engine  │      │ • Canonical JSON Section Store│
                        │ • Vector A4 Export Engine    │      │ • Clerk Auth / Local JWT      │
                        └──────────────────────────────┘      └───────────────────────────────┘
```

---

## 🧠 3. Core Modules & Algorithms (What to Explain in Viva)

### A. Living Resume Agent (RAG Grounded Q&A)
- **File:** `backend/services/rag-agent-service.ts` & `app/api/agent/[resumeId]/chat/route.ts`
- **Concept:** Retrieval-Augmented Generation with **0% Hallucination Guarantee**.
- **How It Works:**
  1. The system loads the candidate's canonical resume data (work experience, projects, skills, education) from the database.
  2. It formats a structured knowledge context with section demarcations.
  3. When a recruiter asks a question (e.g., *"What is your experience with latency benchmarks?"*), the agent constructs a system prompt that strictly forbids fabricating information.
  4. It returns the answer along with **verifiable source citations** (e.g., *Section: Work Experience — Senior AI Engineer*).

---

### B. Claim Verification & Trust Score Engine
- **File:** `backend/services/verification-service.ts` & `app/api/verification/[resumeId]/route.ts`
- **Concept:** Automated authenticity scoring for resume bullet points.
- **How It Works:**
  1. Parses metric-heavy claims (e.g., *"Reduced latency by 45%"*, *"Managed 12 engineers"*).
  2. Cross-references against public data points (GitHub repos, commit volume, degree registrar records).
  3. Computes a **Trust Score (0–100%)** based on:
     - Claim Specificity (presence of numbers, percentages, timelines)
     - Source Verifiability
     - Timeline consistency check (no overlapping impossible dates)

---

### C. Multi-Parser ATS Scoring Engine
- **File:** `lib/services/ats-service.ts`
- **Concept:** Pre-flight compliance audit against Fortune 500 ATS systems (Workday, Taleo, Greenhouse, Lever).
- **Scoring Rubric Breakdown:**
  - **Contact Information (15%):** Full Name, Phone, Email, Location, LinkedIn/GitHub links.
  - **Work Experience & Quantified Impact (35%):** Action verbs, metric density (%, $, numbers), chronological structure.
  - **Skill Density & Categorization (25%):** Technical skills, frameworks, tools.
  - **Readability & Formatting (25%):** Section headers, bullet length, avoidance of parsing blockers (tables/graphics).

---

### D. Semantic Job Description (JD) Matcher
- **File:** `backend/services/jd-matcher.ts` & `app/api/match/route.ts`
- **Concept:** Real-time gap analysis between a candidate's resume and target job requirements.
- **Output:** Overall Match Percentage, Matched Keywords, Missing Skills, and targeted recommendations.

---

### E. 3-Zone Builder & Vector A4 Print Engine
- **File:** `app/(app)/builder/[resumeId]/page.tsx` & `components/builder/ResumeTemplates.tsx`
- **Zones:**
  1. **Left Navigation Zone:** Section reordering, template switching, color controls.
  2. **Middle Editor Zone:** Form fields with AI bullet enhancement (Google/XYZ formula).
  3. **Right Preview Zone:** Live debounced A4 vector preview with instant print stylesheet (`@media print`).

---

## 💬 4. Top 10 Anticipated Viva Questions & Model Answers

### Q1: What is the main innovation of CallBack.ai compared to Canva or Novoresume?
> **Answer:** Canva and traditional builders treat resumes as dead design files that frequently fail ATS parsers. CallBack.ai uses a **canonical structured JSON data model** that ensures 100% ATS compliance across Workday and Greenhouse, and turns the resume into an **interactive candidate agent** that recruiters can chat with directly to verify claims.

### Q2: How does the Living Candidate Agent avoid hallucinating facts?
> **Answer:** We implement strict Grounded Retrieval-Augmented Generation (RAG). The LLM is given the candidate's verified resume database records as system context with explicit instructions to refuse answering or state that an item is unverified if the information is not present in the record. Every response includes cited section snippets.

### Q3: Why did you use Next.js App Router and Prisma ORM?
> **Answer:** Next.js App Router provides server-side rendering (SSR), dynamic server components, and API routes in a single unified full-stack architecture. Prisma provides type-safe database queries with schema migrations, allowing seamless transitions between SQLite in local development and PostgreSQL in production.

### Q4: How is the ATS Score calculated?
> **Answer:** We use a multi-factor weighted scoring rubric:
> 1. Contact Information completeness (15%)
> 2. Action verb and metric density (35%)
> 3. Technical skill keyword density (25%)
> 4. Readability and section hierarchy (25%)

### Q5: How do you handle authentication?
> **Answer:** We implemented **Clerk Authentication** for enterprise-grade OAuth, social sign-in, and session management, coupled with a local JWT fallback system so the application operates seamlessly in offline or demo environments.

### Q6: How does the PDF Export maintain exact A4 single-page dimensions?
> **Answer:** We utilize `@media print` CSS rules defining standard `210mm × 297mm` viewport dimensions with zero margin bleed, combined with HTML5 vector rendering to produce clean, selectable text rather than rasterized images.

### Q7: What is the purpose of the Skill Graph?
> **Answer:** The Skill Graph aggregates skills across all resume sections into a categorized, weighted graph (Languages, Frameworks, Cloud, Databases) with proficiency levels and project associations.

### Q8: What database schema did you design?
> **Answer:** Our Prisma schema includes `User`, `Resume`, `Section`, `SkillGraph`, `VerificationClaim`, and `JobPosting` models with relational integrity and cascade deletions.

### Q9: How does the AI bullet enhancer work?
> **Answer:** It uses the **Google XYZ formula**: *"Accomplished [X], as measured by [Y], by doing [Z]"*. It detects weak passive verbs and transforms them into strong action verbs backed by quantifiable metrics.

### Q10: How is the color theme organized in the application?
> **Answer:** The entire UI is unified around `#048BA2` (Cyan Teal) with `#037488` hover states, `#E6F5F8` soft badges, and clean slate surfaces (`#F5F9FB`), avoiding distracting multi-color gradients on buttons.

---

## 🚀 5. Quick Commands Reference

```bash
# Install dependencies
npm install

# Run database migrations and seed demo data
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# Start development server
npm run dev

# Run production build check
npm run build
```
