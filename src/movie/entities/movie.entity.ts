import { IsAlpha, IsNotEmpty, isString, IsString } from 'class-validator';
import { Genre } from 'src/genres/entities/genre.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movies extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  title: string;

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

  @Column({ default: 0 })
  popularity: number;

  @Column({ default: 0 })
  vote_average: number;

  @Column({ default: 0 })
  vote_count: number;

  @Column({ default: false })
  video: boolean;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  release_date: string;

  @OneToMany(() => Genre, (genre: Genre) => genre.id)
  genre_ids: Genre[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
