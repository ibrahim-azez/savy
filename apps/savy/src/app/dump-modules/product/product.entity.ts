import { Discount, Order } from '@core';
import { Cart } from '../../modules/cart/cart.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@Index(['id', 'name'])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: true })
  color!: string;

  @Column({ nullable: true })
  picture!: string;

  @Column({ nullable: true })
  ranking!: number;

  @Column({ nullable: true })
  barcode!: string;

  @Column({ nullable: true })
  vendor!: string;

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

  @OneToMany(() => Order, (order: Order) => order.product, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  order!: Order[];

  @ManyToMany(() => Cart, (cart: Cart) => cart.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  cart!: Array<Cart>;

  @OneToOne(() => Discount, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  discount!: Discount;
}
