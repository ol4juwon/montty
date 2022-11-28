import { IsAlpha, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMovieDto {
  @Column()
  @IsString()
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
  @IsString()
  @IsNotEmpty()
  release_date: string;
}
