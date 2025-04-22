import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TmdbModule } from './modules/tmdb/tmdb.module';
import { MovieModule } from './modules/movie/movie.module';
import { GenreModule } from './modules/genre/genre.module';
import { UserModule } from './modules/user/user.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { RatingModule } from './modules/rating/rating.module';
import { CacheModule } from '@nestjs/cache-manager';
import authConfig from './config/auth/auth.config';
import { AuthModule } from './authentication/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 0,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: ['dist/database/entities/*.js'],
        synchronize: configService.get('DATABASE_SYNC')
          ? configService.get('DATABASE_SYNC') == 'true'
          : false,
        autoLoadEntities: true,
        logging: configService.get('DATABASE_LOGGING')
          ? configService.get('DATABASE_LOGGING')
          : false,
        migrationsTableName: 'migrations',
        migrations: ['dist/database/migrations/*.js'],
        seeds: ['dist/database/seeders/**/*.seeder.js'],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    TmdbModule,
    MovieModule,
    GenreModule,
    UserModule,
    WatchlistModule,
    RatingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
