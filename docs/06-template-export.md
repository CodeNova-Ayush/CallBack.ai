# Template Export

Resume templates are rendered by `components/builder/ResumeTemplates.tsx`.

## Rules

- Templates must render from `ResumeData`, not hardcoded candidate copy.
- Imported data should be normalized before display.
- PDF export uses browser print through the `printable-resume-sheet` class.
- Print styling lives in `app/globals.css`.

## Smoke test

Open `/builder/{resumeId}`, switch each template, then export with the browser print dialog.
