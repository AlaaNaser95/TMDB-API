import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserDto } from '../../modules/user/dto/response/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user): Promise<UserDto> {
    user = new UserDto(user);
    return await this.createToken(user);
  }

  async validateUser(username: string, password: string) {
    let conditions = {
      email: username,
      password: await this.userService.hashPassword(password),
    };
    return await this.userService.getUser(conditions);
  }

  private async createToken(user): Promise<UserDto> {
    const payload = {
      sub: user.id,
    };
    await user.setAccessToken(this.jwtService.sign(payload));
    return user;
  }
}
