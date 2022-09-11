import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: true })
  fullName!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({ nullable: true })
  profilePicture!: string;

  @Column({ nullable: true })
  dateOfBirth!: string;

  @Column({
    nullable: false,
    select: false,
  })
  password!: string;

  @Column({
    default: Date.now().toString(),
    insert: true,
    update: false,
    nullable: false,
  })
  created_at!: string;

  @Column({ default: Date.now().toString(), insert: true, nullable: false })
  updated_at!: string;
}
