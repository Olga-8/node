import { User, IUser } from '../entity/user';
import bcrypt from 'bcrypt';

export const saveUser = async (user: IUser) => {
    return user;
};

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const comparePassword = async (enteredPassword: string, storedPasswordHash: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
};
