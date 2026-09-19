# Repository Guidance

## Project Context

This is Amir Abdurazak's personal site. It serves as a home for portfolio work,
projects, writing, journal entries, and other personal knowledge or content.

## Development Direction

- New code should be TypeScript-first. Use `.ts` and `.tsx` for new source files.
- When touching existing JavaScript files, prefer migrating them to TypeScript when
  it is practical and does not expand the scope too far.
- Do not start a broad JavaScript-to-TypeScript migration unless explicitly asked.
- Preserve existing content unless the requested change clearly removes or replaces
  it.
- Keep changes scoped and avoid unrelated refactors.

## Current Stack

- Next.js
- React
- Tailwind CSS
- MDX content
- GitHub Pages deployment

Until the larger site overhaul begins, prefer the existing project patterns for
routing, styling, content, and metadata.
