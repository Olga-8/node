import { IUser, User } from '../entity/user';
import { hashPassword } from '../utils/hashPassword';
import { validateUser } from '../utils/validate';
import { comparePassword } from '../repositories/user.repository';

export const registerUser = async (email: string, password: string, role: string): Promise<IUser> => {
    const { error } = validateUser(email, password, role);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        email: email,
        password: hashedPassword,
        role: role
    });

    try {
        await newUser.save();
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
    return newUser;
};


export const validateUserLogin = async (email: string, password: string, role: string): Promise<IUser> => {
    try {
        const { error } = validateUser(email, password, role);
        if (error) {
            throw new Error(error.details[0].message);
        }
    } catch (err) {
        console.error('Error in validateUser:', err);
        throw err;
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('No user with such email or password');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('No user with such email or password');
    }

    console.log('user2', user);
    return user;
};
