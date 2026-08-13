# Resume Import Pipeline

The import flow lives in `app/(app)/import-resume/page.tsx` and `app/api/resumes/import/route.ts`.

## Supported sources

- Pasted plain text
- `.txt`
- `.pdf`
- `.docx`

## Output

The importer creates:

- a `Resume`
- normalized `ResumeSection` records
- an initial `AnalysisResult`
- extracted `SkillGraph` entries
- initial verification claims from resume bullets

Imported resume IDs are passed into builder, analyzer, agent, JD matcher, and trust score routes.
