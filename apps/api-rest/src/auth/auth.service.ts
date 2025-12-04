import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserInterface,
  JwtPayloadInterface,
} from 'src/interfaces/user.interface';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // ============================================================
  // REGISTER
  // ============================================================
  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const { username, email, password, confirmPassword } = dto;

    // 1. Validate password match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 2. Validate if username OR email exists
    const existUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    // 3. Hash password — ARGON2
    const passwordHash = await argon2.hash(password);

    // 4. Create user
    const newUser = this.userRepository.create({
      username,
      email,
      password: passwordHash,
    });

    const saved = await this.userRepository.save(newUser);

    // 5. Generate JWT
    const payload: JwtPayloadInterface = {
      sub: saved.id?.toString(),
      email: saved.email,
      username: saved.username,
    };

    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }

  // -----------------------------------------------------
  // VALIDATE USER (Login)
  // -----------------------------------------------------
  async validateUser(username: string, pass: string): Promise<UserInterface> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Compare with argon2
    const isMatch = await argon2.verify(user.password, pass);

    if (!isMatch) {
      throw new UnauthorizedException('Password incorrect');
    }

    return user;
  }

  // -----------------------------------------------------
  // LOGIN
  // -----------------------------------------------------
  async login(user: UserInterface): Promise<{ accessToken: string }> {
    const payload: JwtPayloadInterface = {
      sub: user.id?.toString() ?? '',
      email: user.email ?? '',
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
