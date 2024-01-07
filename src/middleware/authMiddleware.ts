import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header('x-user-id');

    if (req.path === '/auth/register' || req.path === '/auth/login' || req.path === '/health') {
        return next();
    }
    
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }
    req.params.id = userId;
    next();
};

  