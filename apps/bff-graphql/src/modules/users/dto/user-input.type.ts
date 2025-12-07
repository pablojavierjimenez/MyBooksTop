import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInputType {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profileId?: string;

  @Field({ nullable: true })
  profile?: string;

  @Field({ nullable: true })
  authStrategy?: string;
}
