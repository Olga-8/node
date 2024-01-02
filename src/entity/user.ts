import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IUser{
  _id: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);

export { User, IUser};
