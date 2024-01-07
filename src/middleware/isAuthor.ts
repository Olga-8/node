import { Request, Response, NextFunction } from 'express';
import logger from "../utils/logger";

export const isAuthor = (req: Request, res: Response, next: NextFunction) => {

    const currentUser = req.user;

    if (currentUser && currentUser.role === 'admin') {
        next();
    } else {
        logger.error(`User ${currentUser?.email} is not admin`);
        res.status(403).json({ error: 'Forbidden' });
    }
};
