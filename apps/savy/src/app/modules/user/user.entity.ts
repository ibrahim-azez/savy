import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
@Index(['id', 'email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  fullName!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({ nullable: true })
  profilePicture!: string;

  @Column({ nullable: true })
  dateOfBirth!: string;

  @Column({
    nullable: false,
    hstoreType: 'string',
    select: false,
  })
  password!: string;

  @Column({
    default: 'USER',
    select: false,
  })
  role!: 'ADMIN' | 'USER' | 'GUEST';

  @Column({
    default: true,
    nullable: false,
    select: false,
  })
  active!: true;

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

  @OneToMany(() => Cart, (cart: Cart) => cart.user, {
    onUpdate: 'CASCADE',
  })
  cart!: Array<Cart>;

  @OneToMany(() => Order, (cart: Order) => cart.user, {
    onUpdate: 'CASCADE',
  })
  order!: Array<Order>;
}
