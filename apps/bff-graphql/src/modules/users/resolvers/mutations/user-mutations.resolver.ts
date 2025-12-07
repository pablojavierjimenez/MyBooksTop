import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from '../../services/users.service';
import { UserType } from '../../dto/user.type';
import { UserUpdateInput } from '../../dto/user-update.input';

@Resolver(() => UserType)
export class UserMutationsResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UserUpdateInput,
  ) {
    return this.usersService.updateUser(id, input);
  }
}
