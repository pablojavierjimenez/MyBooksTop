import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { rateLimit } from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas (opcional)
  const GLOBAL_PREFIX = 'api';
  app.setGlobalPrefix(GLOBAL_PREFIX);

  // Habilitar versionado
  app.enableVersioning({
    type: VersioningType.URI, // /v1/...
    defaultVersion: '1',
  });

  /*****************************
   * SWAGGER AND DOCUMENTATION
   */
  setupSwagger(app);

  // --- Swagger / OpenAPI setup ---
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription(
      'API v1 Docs con Swagger — ejemplo integrado con ValidationPipe y class-transformer',
    )
    .setVersion('1.0')
    .addTag('auth')
    // Si usas JWT:
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT como: Bearer <token>',
      },
      'bearerAuth', // name de la seguridad (referencia en @ApiBearerAuth si usas)
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  /*****************************
   * SECURITY TOOLS
   */
  // 1. Helmet (versión 6 compatible)
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  // 2. CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // tu front Next.js
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 3. Cookies (necesarias para CSRF o refresh tokens)

  app.use(cookieParser());

  // 4. CSRF protection (solo para páginas web, no para APIs públicas)
  if (process.env.ENABLE_CSRF === 'true') {
    app.use(
      csurf({
        cookie: true,
      }),
    );
  }

  // 5. Rate Limit (proteger ataques de fuerza bruta)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 120, // 120 req por 15 min por IP
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // 6. Pipes Validación global con DTO + class-validator + class-transformer
  // - whitelist: elimina propiedades no declaradas en el DTO
  // - forbidNonWhitelisted: lanza 400 si llegan props extra (útil en APIs estrictas)
  // - transform: convierte tipos (e.g. "123" -> 123) usando class-transformer
  // - transformOptions.enableImplicitConversion: permite la conversión implícita de tipos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // poner true si quires errores en campos extra
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // Opcional: ajustar mensajes, forzar "validation error" shape, etc.
    }),
  );

  // ClassSerializerInterceptor para respetar transformaciones de class-transformer
  // (por ejemplo Exclude, Expose, Transform() en entidades/DTOs)
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const port = process.env.PORT ? Number(process.env.PORT) : 7000;
  await app.listen(port);

  logger.log(`Server running on http://localhost:${port}/${GLOBAL_PREFIX}`);
  logger.log(`Swagger docs available on http://localhost:${port}/docs`);
}
bootstrap();
