import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('users/:userId/watchlist')
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}
  @Post(':movieId')
  async addMovieToWatchlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.watchlistService.addMovieToWatchlist(userId, movieId);
  }

  @Delete(':movieId')
  async deleteMovieFromWatchlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.watchlistService.deleteMovieFromWatchlist(userId, movieId);
  }

  @Get()
  async listWatchlistMovies(@Param('userId', ParseIntPipe) userId: number) {
    return this.watchlistService.listWatchlistMovies(userId);
  }
}
