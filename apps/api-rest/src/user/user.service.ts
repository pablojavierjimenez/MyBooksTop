import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserCreateDto) {
    // Check if user name already exist
    const userExist = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userExist) {
      return new HttpException('User name already exist', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    // Check if user name already exist
    const userExist = await this.userRepository.findOne({
      where: { id },
      // relations: ['profile'],
    });

    if (!userExist) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    return userExist;
  }

  async deleteUser(id: number) {
    // Check if user name already exist
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException(
        `Can't delete, User Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async updateUser(id: number, data: Partial<UpdateUserDTO>) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, data);

    return this.userRepository.findOne({ where: { id } });
  }
}
