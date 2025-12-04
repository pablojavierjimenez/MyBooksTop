import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'homerSimpson',
    description: 'Unique username',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    example: 'homer@springfield.com',
    description: 'Unique valid email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Password, minimum 6 characters',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    example: '12345678',
    description: 'Password confirmation',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  confirmPassword: string;
}
