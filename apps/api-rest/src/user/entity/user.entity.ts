import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from 'src/interfaces/user.interface';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity implements UserInterface {
  @ApiProperty({
    description: 'UUID auto generado del usuario',
    example: '044b226c-58f9-40ec-9afd-91f8f5b9bb35',
  })
  @Column({ type: 'uuid', default: () => 'UUID()' })
  uuid: string;

  @ApiProperty({
    description: 'ID auto incremental del usuario',
    example: 1,
  })
  @Generated('increment')
  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'homerSimpson',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario (excluida del response)',
    example: 'hashed_password_123',
  })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'homer.simpson@example.com',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2025-01-20T14:25:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description:
      'Método de autenticación (local, google, github, facebook, etc.)',
    example: 'local',
    nullable: true,
  })
  @Column({ nullable: true })
  authStrategy: string;

  // @ApiProperty({
  //   description: 'UUID del perfil asociado',
  //   example: '044b226c-58f9-40ec-9afd-91f8f5b9bb35',
  //   nullable: true,
  // })
  // @Column({ type: 'uuid', nullable: true })
  // profileId: string;

  // @ApiProperty({
  //   description: 'Perfil asociado al usuario',
  //   type: () => ProfileEntity,
  //   nullable: true,
  // })
  // @OneToOne(() => ProfileEntity, { eager: false })
  // @JoinColumn({ name: 'profileId' })
  // profile: ProfileEntity;

  // @ApiProperty({
  //   description: 'Posts creados por este usuario',
  //   type: () => [BookEntity],
  // })
  // @OneToMany(() => BookEntity, (post) => book.author)
  // books: BookEntity[];
}
