import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../../modules/user/dto/response/user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Request() req,
    @Body() loginDto: LoginDto,
  ): Promise<UserDto> {
    return await this.authService.login(req.user);
  }
}
