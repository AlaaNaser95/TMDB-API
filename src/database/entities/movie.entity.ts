import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Base } from './base.entity';
import { Genre } from './genre.entity';
import { Watchlist } from './watchlist.entity';

@Entity()
export class Movie extends Base {
  @Column('varchar', { length: 255 })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  overview: string;

  @Column('varchar', { length: 255 })
  @IsNotEmpty()
  @IsString()
  posterLink: string;

  @Column('date', { nullable: true })
  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;

  @Column('varchar', { length: 10 })
  @IsNotEmpty()
  @IsString()
  originalLanguage: string;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.movie)
  watchlists: Watchlist[];
}
