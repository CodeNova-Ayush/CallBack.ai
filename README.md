# Callback AI — Next-Gen AI Resume Builder & Living Candidate Agent Platform

> Callback AI is an AI-powered resume building and candidate intelligence platform. It transforms static traditional PDF resumes into interactive, living AI agents that recruiters can chat with directly. The platform includes real-time ATS optimization, automated job description keyword matching, public claim verification, and voice-native career intake. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Prisma ORM, it provides a seamless end-to-end experience for both job seekers and hiring managers.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM 5.22](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)

[Live App](http://localhost:3000) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Backend API](#-backend-api-specification) • [Local Setup](#-getting-started--local-setup)

---

## 🌟 Overview & Key Features

### 1. Production Landing Page & Template Showcase
![1. Landing Page Showcase](public/screenshots/01-landing-page.png)
Explore interactive resume templates, live AI feature demos, and instant candidate trial access.

---

### 2. Candidate Workspace Dashboard
![2. Candidate Dashboard](public/screenshots/02-candidate-dashboard.png)
Manage active resumes, track real-time ATS compliance scores, view claim verification trust scores, and import old resumes with 1 click.

---

### 3. Living Candidate RAG Agent
![3. Living Candidate RAG Agent](public/screenshots/05-rag-candidate-agent.png)
Allow recruiters to ask direct conversational questions about your work history. Answers are 100% grounded in your actual resume with zero hallucination.

---

### 4. 3-Zone Interactive Resume Builder
Create and customize your resume with a 3-zone layout: section controls on the left, live rich form editor in the center, and real-time A4 printable preview on the right.

---

### 5. ATS Analyzer & AI Bullet Enhancer
Audit your resume against applicant tracking systems. Improve bullet points automatically with strong action verbs, quantifiable impact metrics, and keyword density fixes.

---

### 6. Import Old Resume & Instant ATS Audit
![6. Import Old Resume](public/screenshots/09-import-old-resume.png)
Upload existing PDF, DOCX, or text resumes to instantly generate an ATS audit report and seed your living agent's knowledge base.

---

### 7. Claim Verification & Trust Score Engine
Verify experience claims against public code repositories (such as GitHub) to build recruiter confidence with clear verification badges.

---

### 8. Voice-Native Career Intake Engine
Speak naturally about past projects and responsibilities. The AI transcribes your voice into structured resume sections automatically.

---

### 9. Auto-Tailor Opportunities & Fit Scoring
![9. Opportunities & Auto-Tailor](public/screenshots/10-opportunities-tailor.png)

Paste any target job description to compute your match fit score, discover missing keywords, and generate a tailored application snapshot.

---

### 10. Recruiter Surface & Evaluation Companion
A streamlined dashboard for recruiters to evaluate candidate fit scores, review verified claims, and conduct initial AI agent Q&A screenings.

---

## 🛠️ Backend API Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/resumes/import` | Parses uploaded resume text, calculates ATS score, and seeds RAG memory |
| `POST` | `/api/agent/[resumeId]/chat` | Answers recruiter questions with grounded source citations |
| `POST` | `/api/ai/enhance-bullet` | Enhances action verbs and quantified impact metrics |
| `POST` | `/api/match` | Compares resume against job description to generate fit score |
| `GET` | `/api/verification/[id]` | Returns verification badges and GitHub repository evidence |
| `GET` | `/api/resumes/[id]` | Retrieves structured resume sections and metadata |
| `PUT` | `/api/sections/[id]` | Updates content for a specified resume section |
| `POST` | `/api/sections/reorder` | Updates section display order in the database |

---

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS v4
- **Database & ORM**: Prisma ORM 5.22 with SQLite / PostgreSQL (`dev.db`)
- **Authentication**: Clerk Auth (`@clerk/nextjs`)
- **Icons & UI**: Lucide React, Framer Motion

---

## 🚀 Getting Started & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/CodeNova-Ayush/CallBack.ai.git
cd CallBack.ai
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### 3. Initialize & Seed Database
```bash
npx prisma generate
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

© 2026 Callback AI. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Prisma ORM.
