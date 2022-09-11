import { DataSource } from 'typeorm';
import { User } from './app/modules/user/user.entity';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  database: 'savy',
  username: 'root',
  password: 'password',
  port: 3306,
  entities: [User],
  synchronize: true,
});
