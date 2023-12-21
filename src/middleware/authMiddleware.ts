import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header('x-user-id');
    console.log('Request path:', req.path);
    
    if (req.path === '/auth/register' || req.path === '/auth/login') {
        return next();
    }
    
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }
    req.params.id = userId;
    next();
};
