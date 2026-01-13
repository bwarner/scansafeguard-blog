# CLAUDE.md

This file provides context for Claude when working on this project.

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
npm run typecheck     # TypeScript type checking
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
```

## Adding Blog Posts

Create a new `.mdx` file in `content/posts/` with frontmatter:

```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief description"
---

Post content here...
```

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
