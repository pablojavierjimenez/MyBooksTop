import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import {
  JwtPayloadInterface,
  JwtValidateReturn,
} from 'src/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    };

    super(options);
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtValidateReturn> {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
