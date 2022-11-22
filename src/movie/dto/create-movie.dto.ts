import { IsAlpha, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMovieDto {
  @Column()
  @IsAlpha()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  original_language: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  original_title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  overview: string;

  @Column()
  @IsString()
  poster_path: string;

  @Column()
  @IsNotEmpty()
  user_id: number;

  @Column()
  @IsNotEmpty()
  tmdb_id: number;

  @Column()
  @IsNumber()
  popularity: number;

  @Column({ default: 0 })
  @IsNumber()
  vote_average: number;

  @Column()
  vote_count: number;

  @Column()
  video: boolean;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  release_date: string;
}
