# Folder Structure

CallBack.ai keeps the deployable Next.js application at the repository root while separating the major product layers into clear folders.

## Runtime folders

- `app/`: Next.js App Router pages, layouts, and route handlers.
- `components/`: reusable React UI, navigation, and resume template components.
- `backend/`: business logic engines that can be reused outside route handlers.
- `database/`: Prisma client singleton and database access boundary.
- `lib/`: shared adapters, auth helpers, and service wrappers.
- `prisma/`: schema and seed data.
- `public/`: static assets and screenshots.
- `frontend/`: static HTML prototypes used as design references.

## Deployment note

Do not move `app/` under `frontend/`. Next.js requires `app/` at the project root unless the application is rebuilt around `src/app`.
