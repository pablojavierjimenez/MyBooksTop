import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  email?: string;
}
