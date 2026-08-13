# Production Checks

Run these before deployment:

```bash
npm run build
npx tsc --noEmit
```

Manual checks:

- sign in with Clerk
- import a pasted resume
- open the imported resume in builder
- switch all templates
- export using browser print
- ask the living agent about imported resume details
- run ATS analyzer
- run JD matcher
- open trust score
- open skill graph
