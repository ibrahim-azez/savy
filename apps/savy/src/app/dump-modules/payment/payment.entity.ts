// import { Product, User } from '@modules';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
} from 'typeorm';
import { Order } from '../../modules/order/order.entity';

@Entity()
@Index(['amount'])
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: 'PAID', nullable: false })
  status!: 'PAID' | 'NOT_PAID';

  @Column({
    update: false,
    nullable: false,
    default: Date.now().toString(),
  })
  date!: string;

  @OneToOne(() => Order, (order) => order.payment, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  order!: Order;
}
