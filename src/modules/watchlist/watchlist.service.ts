import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Watchlist } from 'src/database/entities/watchlist.entity';
import { Movie } from 'src/database/entities/movie.entity';
import { ListMoviesDto } from '../movie/dto/response/listMovies.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Watchlist)
    private watchlistRepository: Repository<Watchlist>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async addMovieToWatchlist(userId, movieId) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is invalid');
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie is invalid');
    const watchlist = await this.watchlistRepository.findOneBy({
      userId,
      movieId,
    });
    if (!watchlist) await this.watchlistRepository.save({ userId, movieId });
    return {
      success: true,
      message: 'Movie is added sucessfully to watchlist',
    };
  }

  async listWatchlistMovies(userId) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is invalid');
    const watchlists = await this.watchlistRepository.find({
      where: { userId },
      relations: ['movie'],
    });
    return watchlists.map((watchlist) => new ListMoviesDto(watchlist.movie));
  }

  async deleteMovieFromWatchlist(userId, movieId) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is invalid');
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie is invalid');
    await this.watchlistRepository.delete({ userId, movieId });
    return {
      success: true,
      message: 'Movie is deleted sucessfully from watchlist',
    };
  }
}
