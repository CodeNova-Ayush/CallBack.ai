# Lib

Shared app utilities live here.

## Structure

- `auth/`: Clerk-to-application user helpers.
- `db/`: database exports.
- `services/`: application service adapters and import logic.

Prefer keeping pure business logic in `backend/services` and route-specific orchestration in `app/api`.
