import { User } from '../entity/user';
import bcrypt from 'bcrypt';
import {orm} from '../index' 

export const saveUser = async (user: User): Promise<User> => {
  const em = orm.em.fork();
  await em.persistAndFlush(user);
  return user;
};

export const findUserByEmail = async ( email: string): Promise<User | null> => {
  const em = orm.em.fork();
  return await em.findOne(User, { email });
};

export const findUserById = async ( id: string): Promise<User | null> => {
  const em = orm.em.fork();
  return await em.findOne(User, { id });
};

export const comparePassword = async (enteredPassword: string, storedPasswordHash: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
};
