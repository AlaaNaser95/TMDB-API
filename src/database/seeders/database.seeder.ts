import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource, In } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Genre } from '../entities/genre.entity';
import { TmdbService } from 'src/modules/tmdb/tmdb.service';

async function bootstrap() {
  //checking if database is empty or not
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const genresCount = await dataSource.getRepository(Genre).count();
  if (genresCount > 0)
    console.log('Databases is already seeded, skipping seeding');
  else {
    await seedGenres(app);
    await seedMovies(app);
    console.log('Database has been seeded successfully');
  }
  await app.close();
}

async function seedGenres(app) {
  const dataSource = app.get(DataSource);
  const tmdbService = app.get(TmdbService);

  const genres = await tmdbService.listMoviesGenres();
  const genresToSave = genres.genres.map((genre) => {
    return { name: genre.name, tmdb_id: genre.id };
  });
  await dataSource.getRepository(Genre).save(genresToSave);
}

async function seedMovies(app) {
  const dataSource = app.get(DataSource);
  const tmdbService = app.get(TmdbService);
  const movies = await tmdbService.listPopularMovies(1);

  for (const movie of movies.results) {
    const genreIds = movie.genre_ids;
    const genres: Genre[] = await dataSource.getRepository(Genre).find({
      where: {
        tmdb_id: In(genreIds),
      },
    });

    await dataSource.getRepository(Movie).save({
      originalLanguage: movie.original_language,
      posterLink:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      genres,
    });
  }
}
bootstrap();
