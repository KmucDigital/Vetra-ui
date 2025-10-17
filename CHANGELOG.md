# Changelog

Alle signifikanten Änderungen an diesem Projekt werden in diesem Dokument aufgeführt.
Dieses Changelog folgt dem Format von "Keep a Changelog" und ist in deutscher Sprache verfasst.

Alle nicht-trivialen Änderungen werden unter den entsprechenden Releases dokumentiert. Für ausführlichere Release-Notes siehe `Releases/RELEASE-v1.md`.

## [Unreleased]

- Vorbereitung für zukünftige Releases. (Keine offenen Änderungen im Repo zur Zeit der Erstellung dieses Dokuments.)

## [v1] - 2025-10-17

Erste offizielle Major-Version von Vetra UI.

Highlights:

- Stabile Basis für statische Exports (Next.js App Router, `output: 'export'`).
- Polierte Glassmorphism-Designs mit responsiven Tailwind-Utilities.
- Selbst-gehostete variable Inter-Fonts für zuverlässige Offline-Builds.
- Modularer Komponentenaufbau: `Hero`, `Navigation`, `Features`, `TrustedBy`, `CTASection`, `Footer`.
- Konfigurationsgetriebener Inhalt über `lib/siteConfig.ts` für einfache Anpassungen.
- Multi-Stage Docker-Build, liefert ein statisches Artefakt (`out/`) und dient über `nginx`.

Was ist neu / Änderungen:

- Initiale, stabile API der Komponenten; Prop-Typen sind strikt typisiert (TypeScript).
- Standard-Workflow für statische Seiten-Export und Nginx-Deployment dokumentiert.
- Bereinigte Build-Skripte und Type-Check-Workflow (`pnpm typecheck`).
- Release-Badge und `package.json`-Version auf `v1` gesetzt.

Wartung & Upgrade-Hinweise:

- `pnpm-lock.yaml` wurde nicht manuell aktualisiert in diesem Release. Wenn du ein reproduzierbares Lockfile mit neuen Abhängigkeiten benötigst, führe lokal `pnpm install` aus und committe `pnpm-lock.yaml`.
- Für SSR-Workflows: ändere `next.config.mjs` auf `output: 'standalone'` und passe `Dockerfile` + `start`-Script (`package.json`) entsprechend an (siehe `CLAUDE.md`).

Bekannte Einschränkungen:

- Image-Optimierung ist standardmäßig deaktiviert (`unoptimized: true`) zur Kompatibilität mit statischen Exports.
- Es ist kein Test-Framework (z. B. Jest/Vitest) vorkonfiguriert.

## Quellen & weiterführende Links

- Release-Notes: `Releases/RELEASE-v1.md`
- Repository: https://github.com/kmucdigital/vetra-ui
- README: `README.md`

---

Hinweis: Dieses Changelog wurde automatisch basierend auf den im Repo vorhandenen Release-Notizen und Metadaten erstellt. Möchtest du, dass ich zusätzlich ein Git-Tag (`v1`) setze und einen GitHub Release erstelle, kann ich die nötigen Befehle vorbereiten oder das direkt ausführen, wenn du die Erlaubnis gibst.
