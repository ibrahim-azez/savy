// import { User } from '@modules';

import { User } from '@modules/user/user.entity';
import { hashingPassword } from './hashing-password';

export async function isPasswordValid(
  user: User,
  password: string
): Promise<boolean> {
  const [salt, storedHashedPassword] = user.password.split('.');

  const { hashedPassword } = await hashingPassword(password, salt);

  return storedHashedPassword === hashedPassword;
}
