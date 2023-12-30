export const PORT = process.env.PORT || 3000;
// export const MONGO_URI = 'mongodb://mongo_db:Password123@localhost:27017/mongo_db';
export const MONGO_URI = 'mongodb+srv://mongo_db:Password123@cluster0.nxzrh8i.mongodb.net/';




export enum ORDER_STATUS {
    Created= 'created',
    Completed = 'completed'
}

export const SECRET_KEY = process.env.JWT_SECRET_KEY ||'SECRET'; 