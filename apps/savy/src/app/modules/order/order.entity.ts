import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { Product } from '../../dump-modules/product/product.entity';
import { Payment } from '../../core/entities/payment.entity';
import { User } from '../user/user.entity';

@Entity()
@Index(['name'])
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  quantity!: number;

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

  @ManyToOne(() => User, (user: User) => user.order, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user!: User;

  @OneToMany(() => Product, (product: Product) => product.order, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  products!: Array<Product>;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment!: Payment;
}
