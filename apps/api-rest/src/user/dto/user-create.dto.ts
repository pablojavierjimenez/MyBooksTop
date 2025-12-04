import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { UserInterface } from 'src/interfaces/user.interface';

export class UserCreateDto implements UserInterface {
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'homerSimpson',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'superPassword',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
