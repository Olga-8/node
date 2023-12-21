import { UserEntity } from '../models/user';
import bcrypt from 'bcrypt';

const users: UserEntity[] = [
	{
		id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
		email: "qq@cc.com",
		password: "12345678o",
		role: 'user'
	},
	{
		id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac65c",
		email: "yy@ii.com",
		password: "77777777o",
		role: 'user'
	}
];

export const saveUser = (user: UserEntity): UserEntity => {
	users.push(user);
	console.log(user)
	return user;
};

export const findUserByEmail = (email: string): UserEntity | undefined => {
	return users.find(user => user.email === email);
};

export const findUserById = (id: string): UserEntity | undefined => {
	return users.find(user => user.id === id);
};

export const comparePassword = async (enteredPassword: string, storedPasswordHash: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
};
