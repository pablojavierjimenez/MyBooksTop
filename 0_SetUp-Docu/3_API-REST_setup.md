# API REST SetUp

## 📌 Dependencias generales para ambos proyectos

### Instalar en **api-rest**

```bash
cd apps/api-rest

# Dependencies:
### 📌 Dependencias generales para ambos proyectos
pnpm add @nestjs/config class-validator class-transformer

pnpm add @nestjs/swagger swagger-ui-express

pnpm add @nestjs/typeorm typeorm pg pg-query-stream

### 🔐 Encriptación - bcrypt - argon2 (más seguro que bcrypt)
### 🛡️ Seguridad HTTP - helmet - cors
### 🍪 CSRF (si algún día usas cookies)
pnpm add helmet bcrypt jsonwebtoken argon2 cors csurf


# DevDependencies:
pnpm add -D @types/bcrypt @types/jsonwebtoken @types/argon2 @types/cors @types/cookie-parser @types/csurf

### 🧪 Dependencias para Testing
pnpm add -D jest @types/jest ts-jest supertest @types/supertest jest-mock-extended

### 🛡️🧱 Rate-limit y Parseo seguro de cookies
pnpm add express-rate-limit cookie-parser

```

```bash
dependencies:
  + @nestjs/config ^4.0.2
  + @nestjs/swagger ^11.2.3
  + @nestjs/typeorm ^11.0.0
  + @nestjs/jwt ^11.0.1
  + @nestjs/passport ^11.0.5
  + class-validator ^0.14.3
  + class-transformer ^0.5.1
  + swagger-ui-express ^5.0.1
  + typeorm ^0.3.27
  + pg ^8.16.3
  + pg-query-stream ^4.10.3
  + helmet ^8.1.0
  + bcrypt ^6.0.0
  + jsonwebtoken ^9.0.2
  + argon2 ^0.44.0
  + cors ^2.8.5
  + csurf ^1.11.0
  + cookie-parser ^1.4.7
  + express-rate-limit ^8.2.1
  + passport-jwt ^4.0.1

devDependencies:
  + @types/bcrypt ^6.0.0
  + @types/jsonwebtoken ^9.0.10
  + @types/argon2 ^0.15.4
  + @types/cors ^2.8.19
  + @types/cookie-parser ^1.4.10
  + @types/csurf ^1.11.5
  + @types/passport-jwt ^4.0.1
  + @types/passport-local ^1.0.38
  + jest-mock-extended ^4.0.0

```

## 📌 Tabla de dependencias

| Dependencia                | Versión | Propósito                                                  |
| -------------------------- | ------- | ---------------------------------------------------------- |
| `@nestjs/common`           | ^11.0.1 | Utilidades y decoradores base de NestJS                    |
| `@nestjs/config`           | ^4.0.2  | Manejo de variables de entorno y configuración             |
| `@nestjs/core`             | ^11.0.1 | Núcleo del framework NestJS                                |
| `@nestjs/jwt`              | ^11.0.1 | Manejo de JWT dentro de NestJS                             |
| `@nestjs/passport`         | ^11.0.5 | Integración Passport.js en NestJS para estrategias de auth |
| `@nestjs/platform-express` | ^11.0.1 | Adaptador HTTP Express para NestJS                         |
| `@nestjs/swagger`          | ^11.2.3 | Generación automática de documentación Swagger             |
| `@nestjs/typeorm`          | ^11.0.0 | Integración de TypeORM con NestJS                          |
| `argon2`                   | ^0.44.0 | Hashing de contraseñas (algoritmo Argon2)                  |
| `bcrypt`                   | ^6.0.0  | Hashing de contraseñas (algoritmo bcrypt)                  |
| `class-transformer`        | ^0.5.1  | Transformación de objetos y manejo de DTOs                 |
| `class-validator`          | ^0.14.3 | Validación de datos usando decoradores                     |
| `cookie-parser`            | ^1.4.7  | Parseo de cookies en Express/Nest                          |
| `cors`                     | ^2.8.5  | Middleware CORS para permitir solicitudes cross-origin     |
| `csurf`                    | ^1.11.0 | Protección CSRF para Express/NestJS                        |
| `express-rate-limit`       | ^8.2.1  | Rate-limit para mitigar ataques tipo DoS                   |
| `helmet`                   | ^6.2.0  | Middleware de seguridad HTTP                               |
| `jsonwebtoken`             | ^9.0.2  | Firma y verificación de JWT                                |
| `mysql`                    | ^2.18.1 | Driver MySQL (legacy)                                      |
| `mysql2`                   | ^3.15.3 | Driver MySQL moderno y recomendado                         |
| `passport-jwt`             | ^4.0.1  | Estrategia JWT para Passport.js                            |
| `pg`                       | ^8.16.3 | Driver PostgreSQL                                          |
| `pg-query-stream`          | ^4.10.3 | Streams de consultas en PostgreSQL                         |
| `reflect-metadata`         | ^0.2.2  | Metadata necesaria para decoradores                        |
| `rxjs`                     | ^7.8.1  | Programación reactiva (requerido por NestJS)               |
| `swagger-ui-express`       | ^5.0.1  | Servidor de UI de Swagger en Express                       |
| `typeorm`                  | ^0.3.27 | ORM para bases de datos SQL                                |

---
