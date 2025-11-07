# Vetra UI — Version v2

This major update brings a host of new features, performance optimizations, and stability improvements. From a revamped Docker setup with health checks to new UI components and enhanced security, v2 is a significant leap forward.

## Highlights

- **Glassmorphism UI & AI Chat**: Introduced stunning glassmorphism UI components and integrated an AI chat launcher.
- **Enhanced Docker Workflow**: Switched to a standalone Next.js build for smaller images, added configurable health checks, and optimized the Docker setup.
- **Performance Optimization**: Implemented significant performance improvements, especially for mobile devices.
- **License Protection**: Added a multi-layered LICENSE protection system to ensure license integrity.
- **Improved Type Safety**: Enhanced type safety in several components for a more robust codebase.

## What's new in v2

### Features

- `feat(docker)`: Add healthcheck to container and make it configurable via `HEALTHCHECK_ENABLED` env.
- `feat(api)`: Add health check endpoint (`/api/healthz`).
- `feat`: Add glassmorphism UI components and AI chat integration.
- `feat`: Implement multi-layered LICENSE protection system with integrity checks in Docker, Next.js, and npm scripts.

### Fixes

- `fix`: Add missing `--hostname` flag to node command in `Dockerfile`.
- `fix(Dockerfile)`: Standardize environment variable syntax with equals signs.
- `fix`: Update `package-lock.json`.
- `fix`: Remove `LICENSE` from `.dockerignore` to ensure it's included in the build context.

### Build and Refactoring

- `build(docker)`: Replace `wget` with `curl` in the runtime stage.
- `build`: Switch to `standalone` output in `next.config.mjs` and update Docker setup accordingly.
- `refactor(components)`: Improve type safety in `Hero` and `Features` components.
- `refactor`: Optimize performance and improve Docker setup.
- `refactor`: Focus on mobile performance optimization.

### Documentation and Maintenance

- Update license references in documentation and components.
- Delete `.github/FUNDING.yml`.

## Maintenance & Upgrade-Hinweise

- The Docker setup has been significantly changed. If you have a custom Docker setup, you will need to update it to work with the new standalone output and health check.
- The `package-lock.json` has been updated. It is recommended to run `pnpm install` to ensure your local dependencies are in sync.

## Schnellstart (local)

1.  Abhängigkeiten installieren (verwende pnpm):
    ```powershell
    pnpm install
    ```
2.  Dev-Server starten:
    ```powershell
    pnpm dev
    ```
3.  Production-Build & Vorschau:
    ```powershell
    pnpm build
    node .next/standalone/server.js
    ```
4.  TypeScript-Check vor einem Release ausführen:
    ```powershell
    pnpm typecheck
    ```

## Deployment

- Docker (standalone):
  ```powershell
  docker build -t vetra-ui:standalone .
  docker run -p 3000:3000 vetra-ui:standalone
  ```

## Bekannte Einschränkungen

- Image-Optimierung ist deaktiviert (`unoptimized: true`).
- Kein Test-Framework konfiguriert.

## Credits & Mitwirkende

Vielen Dank an alle Contributors, Issue-Reporter und die Community, die geholfen haben, Vetra UI zu formen. Wenn du Vetra UI nützlich findest, hinterlasse bitte ein Sternchen auf GitHub ⭐

## Links

- Repository: https://github.com/kmucdigital/vetra-ui
- README: https://github.com/kmucdigital/vetra-ui#readme
- Lizenz: MIT — `LICENSE`
