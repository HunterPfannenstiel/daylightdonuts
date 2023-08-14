import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
  const encryptedPassword = await hash(password, 12);
  return encryptedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
