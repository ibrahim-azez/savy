// import { Product, User } from '@modules';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['name', 'percent'])
export class Discount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  percent!: number;

  @Column({ default: true, insert: true, nullable: false })
  active!: boolean;

  @Column({
    default: Date.now().toString(),
    insert: true,
    update: false,
    nullable: false,
  })
  createdAt!: string;

  @Column({
    default: Date.now().toString(),
    insert: true,
    nullable: false,
  })
  updatedAt!: string;
}
