# Deployment Guide

## Build command

```bash
npm run build
```

This runs `prisma generate` before `next build`.

## Start command

```bash
npm run start
```

## Required environment variables

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`

AI provider keys are optional. When absent, local heuristic fallbacks keep core resume features usable.
