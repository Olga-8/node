import { UserEntity } from '../models/user';
import { comparePassword, findUserByEmail, saveUser } from '../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/hashPassword';
import { validateUser } from '../utils/validate';

export const registerUser = async (email: string, password: string, role: string): Promise<UserEntity> => {
  const { error } = validateUser(email, password);
  
  if (error) {
    throw new Error(error.details[0].message);
  }

  if (findUserByEmail(email)) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(password);

  const newUser: UserEntity = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    role
  };

  return saveUser(newUser);
};

export const validateUserLogin = async (email: string, password: string): Promise<UserEntity> => {
  const { error } = validateUser(email, password);
 
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = findUserByEmail(email);
 
  if (!user) {
    throw new Error('No user with such email or password');
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('No user with such email or password');
  }
 
  return user;
};