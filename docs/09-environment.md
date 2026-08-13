# Environment

Use `.env.example` as the deployment template.

## Production notes

- Do not commit real secrets.
- Configure Clerk redirect URLs for the deployed domain.
- Use a production database URL for deployed builds.
- Keep local SQLite only for local demos unless the deployment target supports persistent file storage.
- Rotate any AI provider keys before public deployment.
