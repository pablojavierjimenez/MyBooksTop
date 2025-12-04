import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { Repository } from 'typeorm';

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
}
