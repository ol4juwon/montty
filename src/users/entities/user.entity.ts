import { IsAlpha, IsNotEmpty } from 'class-validator';
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
import * as bcrypt from 'bcrypt';
import { Fave } from 'src/faves/entities/fave.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @OneToMany(() => Fave, (fave: Fave) => fave.user_id)
  Fave: Fave[];

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsAlpha()
  username: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsAlpha()
  phoneNumber: string;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
