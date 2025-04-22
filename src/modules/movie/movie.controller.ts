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
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List All movies',
    description: 'Returns an orderd list of filtered movies in pages',
  })
  @UseInterceptors(PaginationInterceptor)
  @Get()
  async listMovies(@Query() listMoviesRquestDto: ListMoviesRquestDto) {
    return await this.movieService.listMovies(listMoviesRquestDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List movies',
    description: 'Returns an ordered list of filtered movies in pages',
  })
  @Get('all')
  async listAllMovies() {
    return await this.movieService.listAllMovies();
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get movie details',
    description: 'Returns all movie details of the specified movie id',
  })
  @ApiParam({
    name: 'movieId',
    required: true,
    description: 'Movie ID',
  })
  @Get(':movieId')
  async getMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return await this.movieService.getMovie(movieId);
  }

  @ApiOperation({
    summary: 'Create Movie',
    description: 'Create new movie and save it to database',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createMovie(createMovieDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update Movie',
    description: 'Update some movie details (overview, posterLink and genres)',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'movieId',
    required: true,
    description: 'Movie ID',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':movieId')
  async updateMovie(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.updateMovie(movieId, updateMovieDto);
  }

  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'movieId',
    required: true,
    description: 'Movie ID',
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete Movie',
    description: 'Delete movie by ID.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':movieId')
  async deleteMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return await this.movieService.deleteMovie(movieId);
  }
}
