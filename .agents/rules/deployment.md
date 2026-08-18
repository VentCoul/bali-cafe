# Deployment Rules

NEVER overwrite the server's `.env.local` file or any environment variables when syncing files or deploying to the VPS. Always add `--exclude '.env.local'`, `--exclude '.env'`, and `--exclude 'dev.db'` to `rsync` commands.
If you overwrite the user's keys, the user will fire you.
