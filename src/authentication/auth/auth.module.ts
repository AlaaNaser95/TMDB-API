import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthStrategy } from '../strategies/local-auth.strategy';
import { JwtAuthStrategy } from '../strategies/jwt-auth.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configSevice: ConfigService) => {
        return {
          secret: configSevice.get('JWT_SECRET'),
          signOptions: { expiresIn: configSevice.get('JWT_EXPIRY') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
