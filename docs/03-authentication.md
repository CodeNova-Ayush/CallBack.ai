# Authentication

Clerk is the authentication provider.

## Boundaries

- `proxy.ts` initializes Clerk request context for Next.js 16.
- `app/(app)/layout.tsx` protects the authenticated application shell.
- API routes that read or mutate resume data should call `auth.protect()`.
- `lib/auth/` contains app-level user helpers that bridge Clerk users to Prisma users.

## Local routes

- `/login`
- `/register`
- `/sign-in`
- `/sign-up`
- `/sso-callback`
- `/auth-complete`
