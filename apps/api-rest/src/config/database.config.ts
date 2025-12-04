import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // DB Service .env
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),

  // Data Base Connection
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  // Configuración adicional TypeORM
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: process.env.TYPEORM_AUTOLOAD_ENTITIES,
}));
