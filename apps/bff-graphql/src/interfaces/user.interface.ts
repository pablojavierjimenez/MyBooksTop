export interface UserInterface {
  uuid?: string;
  id?: number;
  username: string;
  password?: string;
  createdAt?: Date;
  authStrategy?: string;
  profileId?: string;
  profile?: string;
  email?: string;
}
