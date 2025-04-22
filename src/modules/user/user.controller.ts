import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/createUser.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({
    summary: 'List users',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  async listUsers() {
    return await this.userService.listUsers();
  }

  @ApiOperation({
    summary: 'Create new user',
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
