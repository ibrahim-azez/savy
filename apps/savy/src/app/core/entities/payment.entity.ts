// import { Product, User } from '@modules';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['amount'])
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  status!: 'PAID' | 'NOT_PAID';

  @Column({
    update: false,
    nullable: false,
  })
  date!: string;
}
