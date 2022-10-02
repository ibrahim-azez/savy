// import { Product, User } from '@modules';

// import { Product } from '@dump-modules';
// import { User } from '@modules';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { Product } from '../../dump-modules/product/product.entity';
import { Payment } from './payment.entity';

@Entity()
@Index(['name', 'bill'])
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: false })
  bill!: number;

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

  @ManyToOne(() => Product, (product: Product) => product.order, {
    onUpdate: 'CASCADE',
  })
  product!: Product;

  @OneToOne(() => Payment, { cascade: true })
  @JoinColumn()
  payment!: Payment;
}
