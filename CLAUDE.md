# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ScanSafeguard Security Blog - a blog covering computer security topics. This is the companion publication for [ScanSafeguard](https://www.scansafeguard.com), an agentic security application.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS v4 with Typography plugin
- **Content**: MDX with CodeHike for syntax highlighting
- **Language**: TypeScript
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Analytics**: PostHog
- **Deployment**: Vercel

## Project Structure

```
app/                  # Next.js App Router pages
  posts/              # Blog listing and individual post pages
  layout.tsx          # Root layout
  page.tsx            # Homepage
content/
  posts/              # MDX blog posts (add new posts here)
components/           # React components
lib/
  content.ts          # Content loading utilities
  types.ts            # TypeScript type definitions
public/               # Static assets
```

## Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint (zero warnings allowed)
npm run lint:fix      # Auto-fix lint issues
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without writing
npm run typecheck     # TypeScript type checking
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test -- app/error.test.tsx  # Run a single test file
```

## Git Hooks

Managed by Husky with lint-staged:

- **pre-commit**: Runs ESLint and Prettier on staged files
- **pre-push**: Runs full test suite

## Adding Blog Posts

Create a new `.mdx` file in `content/posts/` with an exported metadata object:

```mdx
export const metadata = {
  title: "Post Title",
  description: "Brief description",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
  image: "/images/posts/post-name.png",
  published: true,
};

# Post Title

Post content here...
```

Required metadata fields: `title`, `description`, `date`, `published`

Optional fields: `tags`, `image`, `author`, `updated`

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog API host (default: `https://us.i.posthog.com`)

Set these in Vercel dashboard for production.

## Architecture Notes

**MDX Processing**: Posts use `next-mdx-remote/rsc` with CodeHike for syntax highlighting. The metadata export is parsed separately via regex in `lib/content.ts`, then stripped before MDX compilation.

**Static Generation**: Posts are statically generated via `generateStaticParams()` in `app/posts/[slug]/page.tsx`. The `getAllPostSlugs()` function provides slugs at build time.

## Code Conventions

- Use TypeScript for all code
- Follow existing ESLint configuration (strict, zero warnings)
- Use Tailwind for styling
- Keep components in `components/` directory
- Tests use `.test.tsx` extension alongside source files

## Content Guidelines

- Focus on computer security topics
- Educational and informative tone
- Include code examples where relevant
- Use proper security disclaimers for offensive techniques
