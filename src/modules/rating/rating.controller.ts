import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { SaveRatingDto } from './dto/request/saveRating.dto';

@Controller()
export class RatingController {
  constructor(private ratingService: RatingService) {}
  @Post('movies/:movieId/ratings')
  async saveMovieRating(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() saveRatingDto: SaveRatingDto,
  ) {
    return this.ratingService.saveMovieRating(movieId, saveRatingDto);
  }

  @Get('movies/:movieId/ratings')
  async listMovieRatings(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.ratingService.listMovieRatings(movieId);
  }

  @Get('users/:userId/ratings')
  async listUserRatings(@Param('userId', ParseIntPipe) userId: number) {
    return this.ratingService.listUserRatings(userId);
  }
}
