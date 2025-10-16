# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vetra UI is a modern, open-source landing page template built with Next.js 14, TypeScript, and Tailwind CSS. The project is configured for **static site generation** (`output: 'export'`) and deploys as a static site via nginx or CDN. It features glassmorphism styling, CSS animations, shadcn/ui components, and self-hosted fonts.

## Commands

### Development
```bash
pnpm install          # Install dependencies (NEVER use npm install)
pnpm dev              # Start development server (http://localhost:3000)
pnpm typecheck        # Run TypeScript type checking
pnpm lint             # Run ESLint
```

### Production
```bash
pnpm build            # Generate static export to out/ directory
pnpm start            # Serve the out/ directory locally via serve
```

### Docker
```bash
docker build -t vetra-ui:static .
docker run -p 80:80 vetra-ui:static
```

## Architecture

### Static Export Configuration
- **Next.js Config**: `next.config.mjs` sets `output: 'export'` for static generation
- **Images**: Configured with `unoptimized: true` for static compatibility
- **Trailing Slashes**: Enabled for consistent static file serving
- **Build Output**: The `out/` directory contains the complete static site

### Core Structure

**App Router (Next.js 14)**
- `app/layout.tsx`: Root layout with metadata, Open Graph tags, and self-hosted Inter font loading
- `app/page.tsx`: Landing page composition - imports and renders all section components in order
- `app/globals.css`: Global styles, CSS custom properties for theming, Tailwind base layers
- `app/fonts/`: Self-hosted Inter variable font files (woff2 format for normal and italic)

**Components** (`components/`)
- Page sections: `Navigation.tsx`, `Hero.tsx`, `TrustedBy.tsx`, `Features.tsx`, `CTASection.tsx`, `Footer.tsx`
- UI primitives: `components/ui/` contains shadcn/ui components (`button.tsx`, `card.tsx`, `badge.tsx`)
- All components use TypeScript with proper typing
- Components import shared config from `lib/siteConfig.ts`

**Library** (`lib/`)
- `siteConfig.ts`: Centralized marketing copy, navigation links, footer structure, pricing data, company logos
- `utils.ts`: Single utility function `cn()` for merging Tailwind classes via clsx and tailwind-merge

**TypeScript Configuration**
- Path alias `@/*` maps to project root for clean imports
- Strict mode enabled
- Target: ES2017

**Styling**
- Tailwind CSS with custom dark theme
- CSS custom properties for colors (HSL format)
- Custom keyframes and animations: `fade-in`, `fade-in-up`
- Glassmorphism effects using backdrop-blur and background opacity
- Responsive design with mobile-first breakpoints

### Deployment

**Static Deployment (Current)**
The Dockerfile performs a multi-stage build:
1. Install dependencies with pnpm
2. Build static export with `pnpm build`
3. Serve `out/` directory via nginx

**nginx Configuration**
- `nginx.conf`: Optimized for static sites with gzip compression and caching headers
- Serves files from `/usr/share/nginx/html`

### Content Management

To update marketing copy, edit `lib/siteConfig.ts`:
- Hero section content
- Trusted by companies list
- Pricing plans and features
- Footer links and social media
- Navigation menu items

## Key Design Patterns

1. **Component Composition**: `page.tsx` imports and renders section components in sequence
2. **Configuration-Driven Content**: All text and URLs live in `siteConfig.ts` for easy updates
3. **Type Safety**: Components use TypeScript with proper prop types
4. **Utility-First Styling**: Tailwind classes composed via `cn()` utility
5. **Self-Hosted Assets**: Fonts and images bundled in the repo for offline builds

## Important Notes

- **Package Manager**: Always use `pnpm`, never `npm` or `yarn`
- **Static Only**: This build targets static export. Dynamic features (API routes, SSR) require changing `next.config.mjs` to `output: "standalone"` and updating the Dockerfile
- **Font Loading**: Inter variable font is self-hosted in `app/fonts/` to avoid external requests
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility
- **SEO**: Metadata configured in `layout.tsx` with Open Graph and Twitter Card support

## Testing

No test framework is currently configured. To add tests:
1. Install Jest/Vitest and React Testing Library
2. Add test scripts to `package.json`
3. Create `__tests__` directories adjacent to components

## Converting to SSR

To enable server-side rendering:
1. Change `next.config.mjs`: Remove `output: 'export'` or set to `"standalone"`
2. Enable image optimization: Remove `unoptimized: true`
3. Update Dockerfile to run Next.js server instead of nginx
4. Change `package.json` start script to `next start`
