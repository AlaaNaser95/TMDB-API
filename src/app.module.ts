import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TmdbModule } from './modules/tmdb/tmdb.module';
import { MovieModule } from './modules/movie/movie.module';
import { GenreModule } from './modules/genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
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
        synchronize: configService.get('DATABASE_SYNC') || false,
        autoLoadEntities: true,
        logging: configService.get('DATABASE_LOGGING') || false,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
