import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserType } from '../../dto/user.type';
import { UsersService } from '../../services/users.service';

@Resolver(() => UserType)
export class UserQueriesResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id) ?? null;
  }
}
