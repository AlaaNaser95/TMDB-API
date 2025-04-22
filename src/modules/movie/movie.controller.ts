import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/request/createMovie.dto';
import { PaginationInterceptor } from 'src/common/interceptor/pagination.interceptor';
import { ListMoviesRquestDto } from './dto/request/listMoviesRequest.dto';
import { UpdateMovieDto } from './dto/request/updateMovie.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createMovie(createMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':movieId')
  async updateMovie(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.updateMovie(movieId, updateMovieDto);
  }

  @UseInterceptors(PaginationInterceptor)
  @Get()
  async listMovies(@Query() listMoviesRquestDto: ListMoviesRquestDto) {
    return await this.movieService.listMovies(listMoviesRquestDto);
  }

  @Get('all')
  async listAllMovies() {
    return await this.movieService.listAllMovies();
  }

  @Get(':movieId')
  async getMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return await this.movieService.getMovie(movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':movieId')
  async deleteMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return await this.movieService.deleteMovie(movieId);
  }
}
