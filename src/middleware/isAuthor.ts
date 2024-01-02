import { Request, Response, NextFunction } from 'express';

export const isAuthor = (req: Request, res: Response, next: NextFunction) => {

    const currentUser = req.user;

    if (currentUser && currentUser.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};
