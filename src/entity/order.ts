import mongoose from 'mongoose';
import { ORDER_STATUS } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { ICartItem } from './cart';

interface IOrder {
  _id: string;
  userId: string;
  cartId: string;
  items: ICartItem[];
  paymentType: string;
  paymentAddress: string;
  paymentCreditCard: string;
  deliveryType: string;
  deliveryAddress: string;
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const orderSchema = new mongoose.Schema<IOrder>({
  _id: { type: String, default: () => uuidv4() },
  userId: String,
  cartId:String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  paymentType: { type: String, required: true },
  paymentAddress: { type: String },
  paymentCreditCard: { type: String },
  deliveryType: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  comments: { type: String },
  status: { type: String, enum: Object.values(ORDER_STATUS), required: true },
  total: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

export { Order, IOrder};
