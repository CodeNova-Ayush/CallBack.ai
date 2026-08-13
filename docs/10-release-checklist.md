# Release Checklist

Before tagging or deploying:

- Build passes.
- TypeScript passes.
- Clerk keys are present in the hosting provider.
- `DATABASE_URL` is present in the hosting provider.
- Prisma client generation runs during install or build.
- Resume import creates a new resume.
- Uploaded resume features use the new resume ID.
- Template export prints only the resume sheet.
- No real secrets are committed.
