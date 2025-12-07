import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { UserQueriesResolver } from './resolvers/queries/user-queries.resolver';
import { UserMutationsResolver } from './resolvers/mutations/user-mutations.resolver';
import { UserType } from './dto/user.type';

@Module({
  providers: [
    UserType,
    UsersService,
    UsersResolver,
    UserQueriesResolver,
    UserMutationsResolver,
  ],
})
export class UsersModule {}
