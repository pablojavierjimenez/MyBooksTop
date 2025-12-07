# ✅ 1. Crear el proyecto NestJS **bff-graphql** dentro de `apps/`

Estando en la raíz del monorepo:

```bash
pnpm dlx @nestjs/cli@10 new apps/bff-graphql
```

Eliminarás la carpeta `.git` que crea Nest automáticamente:

```bash
rm -rf apps/bff-graphql/.git
```

Moverte al proyecto:

```bash
cd apps/bff-graphql
```

---

## 🎯 **PASO 2 Instalar dependencias necesarias (versiones específicas)**

### 📌 2. lista FINAL de dependencias correctas

(Las únicas necesarias para tu setup: NestJS 10 + YogaDriver v1 + Yoga v3 + GraphiQL + Schema Tools)

### ✔️ Dependencias necesarias

| Paquete                    | Versión   |
| -------------------------- | --------- |
| `@nestjs/common`           | ^10       |
| `@nestjs/core`             | ^10       |
| `@nestjs/platform-express` | ^10       |
| `@nestjs/graphql`          | ^13       |
| `@graphql-yoga/nestjs`     | **1.1.1** |
| `graphql`                  | **16.x**  |
| `@graphql-tools/schema`    | **10.x**  |
| `node-fetch`               | 3.3.x     |
| `reflect-metadata`         | 0.2.x     |
| `rxjs`                     | 7.x       |
| `tslib`                    | 2.x       |

```bash
## ✅ A. Instalar NestJS 10 básico (ya lo tenías, pero aquí está):
pnpm add @nestjs/common@10 @nestjs/core@10 @nestjs/platform-express@10


## ✅ B. Instalar Yoga v3 + Adapter v1 (versión específica)
pnpm add @graphql-yoga/nestjs@1.1.1 graphql@16 graphql-yoga@3.9.1


## ✅ C. GraphQL for NestJS (NestJS GraphQL v13)
pnpm add @nestjs/graphql@13


## ✅ D. Herramientas del schema
pnpm add @graphql-tools/schema@10


## ✅ E. Utilidades necesarias
pnpm add node-fetch@3 reflect-metadata rxjs


## ✅ F. MUY IMPORTANTE: instalar tslib en todo el workspace
# Desde la RAÍZ del monorepo:
pnpm add tslib --workspace-root

## 👍 OPCIONAL (pero recomendado si usás decorators)
pnpm add class-validator class-transformer
```

---

### ✔️ Resultado final

Con esto, tu `package.json` debe quedar _solo_ con lo necesario para usar:

- NestJS 10
- GraphQLModule
- YogaDriver
- Schema ejecutable (GraphQL Tools)
- GraphiQL
- Consumo del API REST via fetch

---

## ✅ 1. Comandos NestJS para generar la estructura

Dentro del proyecto Nest GraphQL:

```bash
# Crear carpeta modules/users
nest g module modules/users

# Crear servicio
nest g service modules/users/services/users --flat

# Crear resolvers
nest g resolver modules/users/resolvers/users --flat

# Resolver para queries
nest g resolver modules/users/resolvers/queries/user-queries --flat

# Resolver para mutations
nest g resolver modules/users/resolvers/mutations/user-mutations --flat

# Crear DTO (GraphQL Type)
nest g class modules/users/dto/user.type --flat
```
