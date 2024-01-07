import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export interface CurrentUser {
    id: string,
    email: string,
    role: string
}

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        logger.error('Token is required');
        return res.status(401).send("Token is required");
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        logger.error('Invalid token type');
        return res.status(403).send("Invalid Token");
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY!) as CurrentUser;
        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}