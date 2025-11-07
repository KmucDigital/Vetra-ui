# vetra

Generiert mit **KMUC Dev CLI**

## Projekt-Info

- **Typ**: nextjs
- **Port**: 8085

- **Deployment**: vps

## Setup

### Lokal starten

1. Kopiere `.env.example` zu `.env` und passe die Werte an:

```bash
cp .env.example .env
```

2. Starte die Container:

```bash
docker-compose up -d
```

3. Öffne im Browser: http://localhost:8085

### Logs anzeigen

```bash
docker-compose logs -f
```

### Container stoppen

```bash
docker-compose down
```

## Deployment

### VPS Deployment

1. Stelle sicher, dass du SSH-Zugriff hast
2. Führe das Deploy-Script aus:

```bash
./scripts/deploy.sh
```

## Lizenz

Dieses Projekt ist nur für private, nicht-kommerzielle Nutzung bestimmt.
