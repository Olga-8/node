import { Cart, ICart } from '../entity/cart';
import { CartItem } from '../entity/cart';
import { IProduct, Product } from '../entity/product';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  let cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    cart = new Cart({ userId, isDeleted: false, items: [] });
    await cart.save();
  }
  return cart.populate('items.product');
};

export const calculateCartTotal = async (cartId: string): Promise<number> => {
  const cart = await Cart.findById(cartId).populate('items');
  if (!cart) throw new Error('Cart not found');

  return cart.items.reduce( (total, item ) => {
    return total + (item.product.price * item.count);
  }, 0);

};


export const updateCart = async (userId: string, productId: string, count: number): Promise<ICart> => {
  const cart = await Cart.findOne({ userId }).populate('items.product');
  if (!cart) throw new Error('Cart not found');

  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);

  if (existingItemIndex > -1) {
    if (count > 0) {
      cart.items[existingItemIndex].count = count;
    } else {
      cart.items.splice(existingItemIndex, 1);
    }
  } else if (count > 0) {
    cart.items.push({ product, count });
  }

  await cart.save();
  return cart;
};


export const emptyCart = async (userId: string): Promise<void> => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Cart not found');
  cart.items = [];
  await cart.save();
};

export const deleteCart = async (userId: string): Promise<void> => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Cart not found');
  cart.isDeleted = true;
  await cart.save();
};
