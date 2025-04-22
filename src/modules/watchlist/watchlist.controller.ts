import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { SaveWatchlistDto } from './dto/request/saveWatchlist.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('watchlist')
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}
  @Post()
  async addMovieToWatchlist(
    @Req() req,
    @Body() saveToWatchlistDto: SaveWatchlistDto,
  ) {
    return this.watchlistService.saveWatchlist(req, saveToWatchlistDto);
  }

  @Get()
  async listWatchlistMovies(@Req() req) {
    return this.watchlistService.listWatchlistMovies(req);
  }
}
