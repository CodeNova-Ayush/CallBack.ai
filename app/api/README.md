# API Routes

Route handlers in this directory form the application backend surface.

## Auth requirement

Routes that access candidate data should call `auth.protect()` and resolve the current app user when ownership matters.

## Main endpoints

- `resumes`
- `resumes/import`
- `resumes/[id]/analyze`
- `agent/[resumeId]/chat`
- `match`
- `sections`
- `verification`
