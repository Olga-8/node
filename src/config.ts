export const PORT = process.env.PORT || 3000;


export enum ORDER_STATUS {
    Created= 'created',
    Completed = 'completed'
}

export const SECRET_KEY = process.env.JWT_SECRET_KEY ||'SECRET'; 