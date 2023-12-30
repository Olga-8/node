import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const productSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

export  {Product, IProduct}
