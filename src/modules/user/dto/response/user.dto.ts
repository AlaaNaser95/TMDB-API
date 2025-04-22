import { User } from 'src/database/entities/user.entity';

export class UserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  accessToken: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  setAccessToken(token) {
    this.accessToken = token;
  }
}
