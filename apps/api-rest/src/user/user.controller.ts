import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista de usuarios' })
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() newUser: UserCreateDto) {
    return await this.userService.createUser(newUser);
  }
}
