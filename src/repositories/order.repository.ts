import { IOrder, Order } from '../entity/order';
import mongoose from 'mongoose';

export const saveOrder = async (order: mongoose.Document & IOrder): Promise<IOrder> => {
  return await order.save();
};
