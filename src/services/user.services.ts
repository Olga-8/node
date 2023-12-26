
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entity/user';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { hashPassword } from '../utils/hashPassword';
import { validateUser } from '../utils/validate';
import { comparePassword } from '../repositories/user.repository';
import { orm } from '../index';

export const registerUser = async (email: string, password: string, role: string): Promise<User> => {
    const em: EntityManager = orm.em.fork();
    const userRepository = em.getRepository(User);
    const { error } = validateUser(email, password);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User();
    newUser.id = uuidv4(); //id
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = role;
    try {
        await userRepository.persistAndFlush(newUser);
    } catch (error) {
        console.error('Ошибка при сохранении пользователя:', error);
    }
    return newUser;
};

export const validateUserLogin = async (email: string, password: string): Promise<User> => {
    const em: EntityManager = orm.em.fork();
    const userRepository = em.getRepository(User);
    try {
        const { error } = validateUser(email, password);
        if (error) {
            throw new Error(error.details[0].message);
        }
    } catch (err) {
        console.error('Error in validateUser:', err);
        throw err;
    }
    const user = await userRepository.findOne({ email });
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
