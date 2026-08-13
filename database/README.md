# Database Boundary

`database/db.ts` owns Prisma client creation.

Use this folder for low-level database connection concerns only. Application service logic should stay in `backend/services` or `lib/services`.
