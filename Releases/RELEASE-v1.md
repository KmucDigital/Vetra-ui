# Vetra UI — Version v1

Wir freuen uns, die erste offizielle Major-Version von Vetra UI zu veröffentlichen: **v1** 🎉

Vetra UI ist ein modernes, Open-Source Landing-Page Template gebaut mit Next.js 14, TypeScript und Tailwind CSS. Diese Version markiert einen stabilen Ausgangspunkt für produktive statische Seiten und Marketing-Landingpages.

## Highlights

- Stabile Basis für statische Exports (Next.js App Router, `output: 'export'`)
- Polierte Glassmorphism-Designs mit responsiven Tailwind-Utilities
- Selbst-gehostete Inter Variable Fonts für zuverlässige Offline-Builds
- Modularer Komponentenaufbau (Hero, Navigation, Features, TrustedBy, CTA, Footer)
- Konfigurationsgetriebener Inhalt über `lib/siteConfig.ts` für einfache Copy- und URL-Anpassungen
- Verpackt als statisches Docker-Image: Multi-Stage-Build → `out/` → nginx

## Was ist neu in v1

- Initiale, stabile API der Komponenten: Prop-Typen sind strikt typisiert (TypeScript)
- Standard-Workflow für statische Seiten-Export und Nginx-Deployment dokumentiert
- Bereinigte Build-Skripte und Type-Check-Workflow (`pnpm typecheck`)
- Release-Badge und `package.json` Version auf `v1` gesetzt

## Wartung & Upgrade-Hinweise

- Paket-Lock (`pnpm-lock.yaml`) wurde nicht manuell verändert. Wenn du ein reproduzierbares Lockfile mit neuen Abhängigkeiten möchtest, führe lokal `pnpm install` aus, committe das Ergebnis und öffne einen PR.
- Wenn du SSR (Server-Side Rendering) benötigst, siehe Abschnitt "Converting to SSR" in `CLAUDE.md`: ändere `next.config.mjs` auf `output: 'standalone'` und passe die Dockerfile sowie das Start-Skript (`package.json`) an.

## Schnellstart (local)

1. Abhängigkeiten installieren (verwende pnpm):

```powershell
pnpm install
```

2. Dev-Server starten:

```powershell
pnpm dev
```

3. Statische Production-Build & Vorschau:

```powershell
pnpm build
pnpm start
```

4. TypeScript-Check vor einem Release ausführen:

```powershell
pnpm typecheck
```

## Deployment

- Docker (static):

```powershell
docker build -t vetra-ui:static .
docker run -p 80:80 vetra-ui:static
```

- Die `nginx.conf` im Repo enthält optimierte Header und Caching-Einstellungen für statische Sites.

## Bekannte Einschränkungen

- Image-Optimierung ist deaktiviert (`unoptimized: true`) zur Kompatibilität mit statischen Exports. Aktiviere sie nur, wenn du SSR/standalone-Server einsetzt.
- Kein Test-Framework konfiguriert. Bitte Tests hinzufügen (Jest/Vitest) wenn du Komponenten aktiv wartest.

## Credits & Mitwirkende

Vielen Dank an alle Contributors, Issue-Reporter und die Community, die geholfen haben, Vetra UI zu formen. Wenn du Vetra UI nützlich findest, hinterlasse bitte ein Sternchen auf GitHub ⭐

## Links

- Repository: https://github.com/kmucdigital/vetra-ui
- README: https://github.com/kmucdigital/vetra-ui#readme
- Lizenz: MIT — `LICENSE`

---

Für den Release-Body auf GitHub kannst du den Inhalt dieses Dokuments benutzen. Möchtest du, dass ich direkt einen Commit mit Tag `v1` und Push bzw. einen GitHub Release erstelle, sage Bescheid und ich erledige das (oder ich zeige die genauen Befehle dafür).
