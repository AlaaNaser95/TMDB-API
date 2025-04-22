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
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller()
export class RatingController {
  constructor(private ratingService: RatingService) {}
  @ApiOperation({
    summary: 'Rate Movie',
    description: 'Add rating or update movie rating',
  })
  @ApiParam({
    name: 'movieId',
    required: true,
    description: 'Movie ID',
  })
  @UseGuards(JwtAuthGuard)
  @Post('movies/:movieId/ratings')
  async saveMovieRating(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() saveRatingDto: SaveRatingDto,
    @Req() req,
  ) {
    return this.ratingService.saveMovieRating(req, movieId, saveRatingDto);
  }

  @ApiOperation({
    summary: 'List Movie Ratings',
    description: 'list all rating scores for a movie',
  })
  @ApiParam({
    name: 'movieId',
    required: true,
    description: 'Movie ID',
  })
  @Get('movies/:movieId/ratings')
  async listMovieRatings(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.ratingService.listMovieRatings(movieId);
  }

  @ApiOperation({
    summary: 'List my Ratings',
    description: 'list all my ratings.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('ratings')
  async listUserRatings(@Req() req) {
    return this.ratingService.listUserRatings(req);
  }
}
