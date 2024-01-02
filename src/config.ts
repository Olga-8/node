export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;

export enum ORDER_STATUS {
    Created= 'created',
    Completed = 'completed'
}

export const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
