import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { SaveWatchlistDto } from './dto/request/saveWatchlist.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('watchlist')
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}
  @ApiOperation({
    summary: 'Save to watchlist',
    description: 'Add or delete movie from watchlist',
  })
  @Post()
  async addMovieToWatchlist(
    @Req() req,
    @Body() saveToWatchlistDto: SaveWatchlistDto,
  ) {
    return this.watchlistService.saveWatchlist(req, saveToWatchlistDto);
  }

  @ApiOperation({
    summary: 'List watchlists',
    description: 'List watchlist movies',
  })
  @Get()
  async listWatchlistMovies(@Req() req) {
    return this.watchlistService.listWatchlistMovies(req);
  }
}
