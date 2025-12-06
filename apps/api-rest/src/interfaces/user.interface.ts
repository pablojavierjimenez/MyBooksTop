export interface UserInterface {
  uuid?: string;
  id?: number;
  username: string;
  password: string;
  createdAt?: Date;
  authStrategy?: string;
  profileId?: string;
  profile?: string;
  email?: string;
}

export interface JwtPayloadInterface {
  sub: string; // obligatorio, porque validate() lo exige
  email: string;
  username: string;
  name?: string;
}

export interface JwtValidateReturn {
  userId: string;
  email: string;
}
