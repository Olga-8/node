import jwt from 'jsonwebtoken';
import  { SECRET_KEY } from "../config";

export const generateAuthToken = (userId: string): string => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};
