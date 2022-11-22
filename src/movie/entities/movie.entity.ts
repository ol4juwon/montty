import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class Movies extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdb_id: number;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  title: string;

  @ManyToOne(() => User, (fave: User) => fave.Fave)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column()
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

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  popularity: Double;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  vote_average: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  vote_count: number;

  @Column({ default: false })
  video: boolean;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  release_date: string;
}
