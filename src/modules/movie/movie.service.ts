import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/database/entities/genre.entity';
import { Movie } from 'src/database/entities/movie.entity';
import { DataSource, In, Repository } from 'typeorm';
import { ListMoviesDto } from './dto/response/listMovies.dto';
import { MovieDto } from './dto/response/movie.dto';
import { UpdateMovieDto } from './dto/request/updateMovie.dto';
import { PaginationResponseDto } from 'src/common/dto/response/paginationResponse.dto';
import { ListMoviesRquestDto } from './dto/request/listMoviesRequest.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async createMovie(createMovieDto) {
    const {
      title,
      overview,
      originalLanguage,
      posterLink,
      releaseDate,
      genreIds,
    } = createMovieDto;

    const genres = await this.genreRepository.find({
      where: { id: In(genreIds) },
    });
    if (genres.length != genreIds.length)
      throw new HttpException('Some genres are not valid', 403);
    try {
      const movie = await this.moviesRepository.save(
        this.moviesRepository.create({
          title,
          overview,
          originalLanguage,
          posterLink,
          releaseDate,
          genres,
        }),
      );
      return {
        success: true,
        message: 'Movie has been created successfully',
        movie: new ListMoviesDto(movie),
      };
    } catch (error) {
      console.log('Something went wrong:', error);
      throw error;
    }
  }

  async listMovies(listMoviesRquestDto: ListMoviesRquestDto) {
    const { page, limit, sort, search, genreId } = listMoviesRquestDto;
    try {
      let movies, count;
      let query = await this.listMoviesQuery(search, genreId);
      [movies, count] = await query
        .take(limit)
        .skip(limit * (page - 1))
        .orderBy('movie.id', sort)
        .getManyAndCount();
      return new PaginationResponseDto(
        movies.map((movie) => new ListMoviesDto(movie)),
        count,
      );
    } catch (error) {
      console.log('Something went wrong:', error);
      throw error;
    }
  }

  async getMovie(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['genres'],
    });
    if (!movie) throw new NotFoundException();
    return new MovieDto(movie);
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOneBy({
      id,
    });
    if (!movie) throw new NotFoundException();
    const { genreIds } = updateMovieDto;
    delete updateMovieDto.genreIds;
    if (!genreIds || genreIds.length == 0) {
      throw new HttpException('GenreId must not be empty', 403);
    }
    try {
      if (genreIds) {
        const genres = await this.genreRepository.find({
          where: { id: In(genreIds) },
        });
        if (genres.length != genreIds.length) {
          throw new HttpException('Some genre ids are not valid', 403);
        }
        Object.assign(movie, { ...updateMovieDto, genres });
      } else {
        Object.assign(movie, { ...updateMovieDto });
      }
      await this.moviesRepository.save(movie);
      return {
        success: true,
        message: 'Movie has been updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id: number) {
    await this.moviesRepository.softDelete(id);
    return { success: true, message: 'Movie has been deleted successfully;' };
  }

  private async listMoviesQuery(search, genreId) {
    let query = await this.moviesRepository.createQueryBuilder('movie');

    if (search)
      await query.where('title LIKE :search', { search: `%${search}%` });
    if (genreId) {
      await query
        .leftJoinAndSelect('movie.genres', 'genre')
        .andWhere('genre.id = :genreId', { genreId });
    }
    return query;
  }
}
