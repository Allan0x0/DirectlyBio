import bcrypt, { hash } from 'bcryptjs';

interface Props {
  inputPassword: string;
  hashedPassword: string;
}
export function isValidPassword(props: Props) {
  const { inputPassword, hashedPassword } = props;
  return bcrypt.compare(inputPassword, hashedPassword);
}

export function createHashedPassword(password: string) {
  return hash(password, 10);
}
