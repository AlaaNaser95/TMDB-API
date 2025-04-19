import { Injectable, ParseIntPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private readonly apiKey;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get('TMDB_ACCESS_TOKEN');
  }

  async listPopularMovies(page = 1) {
    const url = this.baseUrl + 'movie/popular' + '?page=' + page;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Something went wrong:', error);
      }
      throw error;
    }
  }

  async listMoviesGenres() {
    const url = this.baseUrl + 'genre/movie/list';
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data || error.message);
      } else {
        console.log('Something went wrong:', error);
      }
      throw error;
    }
  }
}
