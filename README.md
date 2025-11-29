# MyBooksTop

## Quick Start

```bash
cd Docker_DB
docker compose up -d

cd ..
pnpm run start:dev
```

### entorno:

```bash
OS: Ubuntu 22.04.5 LTS x86_64
Kernel: 6.8.0-87-generic
node -v
# -> v22.21.0
npm -v
# -> 10.9.4
pnpm -v
# -> 10.21.0

# NestJS Backend Project : MyBooksTop
MyBooksTop/
├── apps/
│   ├── api/
│   └── bff/
├── packages/
│   └── shared/
├── pnpm-workspace.yaml
└── nest-cli.json
```

## Run Docker (Postgres Data Base and PGAdmin)

- [**PostgreSQL + pgAdmin con Docker Compose - And Comands**](./README.md)

```bash
cd Docker_DB

# Run Docker compose
docker compose up -d

# Stop Docker compose
docker compose down
```

### PGAdmin

_**Nota:** firt check the enviroment variables value on `/Docker_D/.env` file, to confirm Ports, and user login values._

you can use your favorite SQL client App, but also you can use `PGAdmin` a postgres web client.
Test on [http://localhost:8081/](http://localhost:8081/),

- _UserMail:_ `admin@mail.com`
- _Password:_ `adminPass`
