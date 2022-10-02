import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

// import { Product } from '@dump-modules';
import { User } from '@modules/user/user.entity';
import { Product } from '../../dump-modules/product/product.entity';
// import { User } from '@modules';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @ManyToMany(() => Product, (product: Product) => product.cart, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  products!: Array<Product>;

  @ManyToOne(() => User, (user: User) => user.cart, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}
