# Database

Prisma manages the application schema.

## Key files

- `prisma/schema.prisma`: models and relations.
- `prisma/seed.ts`: local/demo seed data.
- `database/db.ts`: Prisma client singleton.
- `lib/db.ts`: app-facing database export.

## Core models

- `User`
- `Resume`
- `ResumeSection`
- `AnalysisResult`
- `VerificationClaim`
- `SkillGraph`
- `AgentConversation`
- `JobDescription`
- `MatchResult`
- `JobPosting`
- `ApplicationDraft`
