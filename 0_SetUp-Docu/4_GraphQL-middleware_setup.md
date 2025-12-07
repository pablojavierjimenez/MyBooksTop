# 4 GraphQL middleware SetUp

## 📌 Dependencias generales para ambos proyectos

### Instalar en **bff-graphql**

```bash
cd apps/bff-graphql

# Dependencies:
### 📌 Dependencias generales para ambos proyectos
pnpm add @nestjs/common@10 @nestjs/core@10 @nestjs/platform-express@10 reflect-metadata rxjs node-fetch tslib

# ⚠️ Si después del fix aparece otro error tipo “Cannot find module tslib/something”
pnpm add tslib --workspace-root

# GraphQL
pnpm add graphql@16 graphql-yoga@3
pnpm add -D @graphql-yoga/nestjs@1

pnpm add -D @types/node


dependencies:
+ graphql ^16.12.0
+ graphql-yoga ^3.9.1
+ @graphql-yoga/nestjs ^1.1.1
+ node-fetch ^3.3.2

+ @apollo/server ^5.2.0
+ @as-integrations/express5 ^1.1.2
+ @nestjs/apollo ^13.2.1
+ tslib ^2.8.1
```

```

```
