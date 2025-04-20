import { User } from 'src/database/entities/user.entity';

export class UserDto {
  readonly id: number;
  readonly name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
