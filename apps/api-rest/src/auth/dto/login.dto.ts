import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { UserInterface } from 'src/interfaces/user.interface';

export class LoginDto implements UserInterface {
  @ApiProperty({
    example: 'homerSimpson',
    description: 'Username of the registered user',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
