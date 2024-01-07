import { Request, Response } from 'express';
import * as UserService from '../services/user.services';
import { generateAuthToken } from '../utils/generateAuthToken';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        const newUser = await UserService.registerUser(email, password, role);

        res.status(200).json({ data: { id: newUser._id, email: newUser.email, role: newUser.role }, error: null });
    } catch (error) {
        const errorMessage = (error as Error).message;

        if (errorMessage === 'Email already in use' || errorMessage === 'Invalid input') {
            res.status(400).json({ data: null, error: { message: errorMessage } });
        } else {
            res.status(500).json({ data: null, error: { message: 'Internal Server Error' } });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        console.log(email, password);
        const user = await UserService.validateUserLogin(email, password, role);
        
        if (!user) {
            return res.status(404).json({
                data: null,
                error: { message: 'No user with such email or password' },
            });
        }

        const token = generateAuthToken(user._id);
        
        res.status(200).json({ data: { token }, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: { message: 'Internal Server Error' } });
    }
};
