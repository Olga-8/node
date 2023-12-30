import { Cart, ICart } from '../entity/cart';
import mongoose from 'mongoose';

export const findCartByUserId = async (userId: string): Promise<ICart | null>=> {
  return await Cart.findOne({ userId, isDeleted: false }).populate('items').exec();
};

export const saveCart = async (cart: mongoose.Document & ICart) => {
  return await cart.save();
};

export const softDeleteCart = async (cartId: string): Promise<void> => {
  await Cart.updateOne({ _id: cartId }, { isDeleted: true }).exec();
};
