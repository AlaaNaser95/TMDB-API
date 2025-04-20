import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/request/createUser.dto';
import { UserDto } from './dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async listUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({ ...createUserDto });
    return {
      success: true,
      message: 'User has been created successfully',
      user: new UserDto(user),
    };
  }
}
