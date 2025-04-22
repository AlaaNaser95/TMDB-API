import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { SaveRatingDto } from './dto/request/saveRating.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller()
export class RatingController {
  constructor(private ratingService: RatingService) {}
  @UseGuards(JwtAuthGuard)
  @Post('movies/:movieId/ratings')
  async saveMovieRating(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() saveRatingDto: SaveRatingDto,
    @Req() req,
  ) {
    return this.ratingService.saveMovieRating(req, movieId, saveRatingDto);
  }

  @Get('movies/:movieId/ratings')
  async listMovieRatings(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.ratingService.listMovieRatings(movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ratings')
  async listUserRatings(@Req() req) {
    return this.ratingService.listUserRatings(req);
  }
}
