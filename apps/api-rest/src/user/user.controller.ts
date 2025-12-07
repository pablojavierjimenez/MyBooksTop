import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() newUser: UserCreateDto) {
    return await this.userService.createUser(newUser);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de usuarios' })
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ) {
    console.log(user);
    return this.userService.updateUser(id, user);
  }
}
