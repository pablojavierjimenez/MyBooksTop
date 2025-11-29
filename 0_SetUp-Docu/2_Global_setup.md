# API SetUp

# 🟦 2. **Crear carpeta del monorepo**

```bash
mkdir MyBooksTop
cd MyBooksTop
```

---

# 🟦 3. **Inicializar PNPM + package.json**

```bash
pnpm init -y

git init
```

---

# 🟦 4. **Crear estructura del monorepo**

```bash
mkdir -p apps/api-rest
mkdir -p apps/bff-graphql
mkdir -p packages/shared
```

---

# 🟦 5. **pnpm-workspace.yaml**

Crear archivo:

```bash
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF
```

# 🟦 6. **Crear los 2 proyectos Nest dentro del monorepo**

> El truco es usar `nest new` con `--directory` dentro de `apps/`.

### API REST

```bash
$ nest new api-rest --directory apps/api-rest --package-manager pnpm

# Eliminar los directorios .git generados automáticamente por nest-cli
rm -rf apps/api-rest/.git

# 🚀  Successfully created project apps/api-rest
# 👉  Get started with the following commands:

$ cd apps/api-rest
$ pnpm run start

```

### BFF GraphQL

```bash
$ nest new bff-graphql --directory apps/bff-graphql --package-manager pnpm

# Eliminar los directorios .git generados automáticamente por nest-cli
rm -rf apps/bff-graphql/.git

# 🚀  Successfully created project apps/bff-graphql
# 👉  Get started with the following commands:

$ cd apps/bff-graphql
$ pnpm run start
```

---
