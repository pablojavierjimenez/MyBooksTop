import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  uuid?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profileId?: string;

  @Field({ nullable: true })
  profile?: string;

  @Field({ nullable: true })
  createdAt?: Date;
}
