import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

interface IHashingPassword {
  salt: string;
  hashedPassword: string;
}

export async function hashingPassword(
  password: string,
  salt?: string
): Promise<IHashingPassword> {
  // Hash the users password
  // Generate a salt if it doesn't get passed
  if (!salt) salt = randomBytes(32).toString('hex');
  // Hash the salt and the password together
  const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;
  // Join the hashed result and the salt together
  return { salt, hashedPassword: hash.toString('hex') };
}
