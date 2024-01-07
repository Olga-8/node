import { IUser, User } from '../entity/user';
import { hashPassword } from '../utils/hashPassword';
import { validateUser } from '../utils/validate';
import { comparePassword } from '../repositories/user.repository';
import { debug } from '../index';
import logger from "../utils/logger";

export const registerUser = async (email: string, password: string, role: string): Promise<IUser> => {
	const { error } = validateUser(email, password, role);
	if (error) {
		throw new Error(error.details[0].message);
	}

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		logger.info('User already exists');
		throw new Error('Email already in use');
	}

	const hashedPassword = await hashPassword(password);
	const newUser = new User({
		email: email,
		password: hashedPassword,
		role: role
	});

	debug('newUser:', newUser);

	try {
		await newUser.save();
	} catch (error) {
		logger.error('Error saving user:', error);
		throw error;
	}
	return newUser;
};


export const validateUserLogin = async (email: string, password: string, role: string): Promise<IUser> => {
	debug(`Validating user with email: ${email}`);
	try {
		const { error } = validateUser(email, password, role);
		if (error) {
			logger.error('Error in validateUser:', error);
			throw new Error(error.details[0].message);
		}
	} catch (err) {
		logger.error('Error in validateUser:', err);
		throw err;
	}

	const user = await User.findOne({ email });
	debug('find user:', user);

	if (!user) {
		logger.error('No user with such email or password');
		throw new Error('No user with such email or password');
	}

	const isPasswordCorrect = await comparePassword(password, user.password);
	if (!isPasswordCorrect) {
		debug(`Password incorrect`);
		logger.error('No user with such email or password');
		throw new Error('No user with such email or password');
	}
	debug('validate user was successful');

	return user;
};
