import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/request/createUser.dto';
import { UserDto } from './dto/response/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}
  async listUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async createUser(createUserDto: CreateUserDto) {
    await this.validateUserEmail(createUserDto.email);
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userRepository.save({ ...createUserDto });
    return {
      success: true,
      message: 'User has been created successfully',
      user: new UserDto(user),
    };
  }

  async hashPassword(password) {
    return await bcrypt.hash(
      password,
      '$2a$12$KMR9.sEnmNUAYl1NincBLOoqtwCsU0m5BjhENTd5ul1uvQ6giRCE.',
    );
  }

  async getUser(conditions: Object | Array<object>, throwError?: boolean) {
    const user = await this.userRepository.findOne({
      where: conditions,
    });
    if (!user && throwError) throw new NotFoundException('User is not found');
    return user;
  }

  private async validateUserEmail(email, excludeUserId?) {
    let conditions = { email };
    if (excludeUserId)
      conditions = Object.assign(conditions, { id: !In(excludeUserId) });
    const userSameEmail = await this.userRepository.findOne({
      where: conditions,
    });
    if (userSameEmail) throw new HttpException('email is invalid', 403);
  }
}
