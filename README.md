# Amir Abdurazak

Amir Abdurazak's personal site: a minimal homepage, selected projects, and an
unlinked writing archive. The site is built with Next.js, TypeScript, and MDX,
then exported as static files for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Site structure

- `/` — primary profile and contact links.
- `/projects` — selected project index.
- `/projects/<slug>` — project writeups.
- `/thoughts` — intentionally unlinked, noindex writing index.
- `/thoughts/1`, `/thoughts/2`, ... — published entries, numbered newest first.

Published writing is read from `data/blog` and `data/journal`. Adding a newer
entry changes the numeric ordering, so numbered URLs are presentation routes,
not permanent identifiers.

## Writing workflow

Create a new draft:

```bash
npm run journal:new -- "Entry title"
```

Create a local-only private entry:

```bash
npm run journal:new -- "Entry title" --status private
```

Entry statuses:

- `draft`: safe to commit, but excluded from `/thoughts` and numbered routes.
- `public`: included in `/thoughts` and deployed after commit/push.
- `private`: created in `data/journal/private`, which is gitignored and
  excluded from builds. Do not move private writing into committed files.

To publish a draft, update its frontmatter to `status: 'public'` and
`draft: false`, then commit and push.

## Deployment

Pushing to `master` runs the GitHub Actions build and deploys the generated
`out` directory to the `gh-pages` branch.
