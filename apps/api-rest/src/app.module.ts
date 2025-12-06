import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT') || 3306,
        username: config.get<string>('MARIADB_USER_NAME'),
        password: config.get<string>('MARIADB_USER_PASSWORD'),
        database: config.get<string>('MARIADB_DATABASE_NAME'),
        autoLoadEntities: config.get<boolean>('TYPEORM_AUTOLOAD_ENTITIES'),
        synchronize: config.get<boolean>('TYPEORM_SYNCHRONIZE'),
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
