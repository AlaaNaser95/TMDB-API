import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Movie } from 'src/database/entities/movie.entity';
import { Rating } from 'src/database/entities/rating.entity';
import { RatingDto } from './dto/response/rating.dto';
import { SaveRatingDto } from './dto/request/saveRating.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async saveMovieRating(movieId, SaveRatingDto: SaveRatingDto) {
    const { score, userId } = SaveRatingDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is invalid');
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie is invalid');
    const rating = await this.ratingRepository.findOneBy({ movieId, userId });
    if (rating) await this.ratingRepository.update(rating.id, { score });
    else await this.ratingRepository.save({ score, movieId, userId });
    await this.updateMovieAverageRatings(movieId);
    return {
      success: true,
      message: 'Rating has been saved successfully',
    };
  }

  async listMovieRatings(movieId) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie is invalid');
    const ratings = await this.ratingRepository.find({
      where: { movieId },
    });
    return ratings.map((ratings) => ratings.score);
  }

  async listUserRatings(userId) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is invalid');
    const ratings = await this.ratingRepository.find({
      where: { userId },
      relations: ['movie'],
    });
    return ratings.map((rating) => new RatingDto(rating));
  }

  private async updateMovieAverageRatings(movieId) {
    const ratingStatistic = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.movieId = :movieId', { movieId })
      .select('AVG(score)', 'avg')
      .addSelect('COUNT(rating.id)', 'count')
      .getRawOne();
    await this.movieRepository.update(movieId, {
      avgRating: ratingStatistic.avg,
      ratingsCount: ratingStatistic.count,
    });
    await this.cacheManager.del('movies-list');
  }
}
