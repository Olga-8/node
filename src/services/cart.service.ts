import { Cart } from '../entity/cart';
import { CartItem } from '../entity/cart';
import { Product } from '../entity/product';
import { v4 as uuidv4 } from 'uuid';
import {orm} from '../index' 

export const getOrCreateCart = async (userId: string): Promise<Cart> => {
  const em = orm.em.fork();
  try {
  let cart = await em.findOne(Cart, { userId });
  console.log("cart", cart)
  if (!cart) {
    cart = new Cart();
    cart.id= uuidv4();
    cart.userId = userId;
    cart.isDeleted = false;
    await em.persistAndFlush(cart);
  }

  return cart;
} catch (error) {
  console.error("Error in getOrCreateCart:", error);
  throw error;
}
};

export const calculateCartTotal = (cart: Cart): number => {
  return cart.items.getItems().reduce((total, item) => total + (item.product.price * item.count), 0);
};

export const updateCart = async ( userId: string, productId: string, count: number): Promise<Cart> => {
  const em = orm.em.fork();
  const cart = await em.findOne(Cart, { userId });
  if (!cart) throw new Error('Cart not found');

  const product = await em.findOne(Product, { id: productId });
  if (!product) throw new Error('Product not found');

  const existingItem = cart.items.getItems().find(item => item.product.id === productId);
  
  if (existingItem) {
    if (count > 0) {
      existingItem.count = count;
    } else {
      cart.items.remove(existingItem);
    }
  } else if (count > 0) {
    const newItem = new CartItem();
    newItem.product = product;
    newItem.count = count;
    cart.items.add(newItem);
  }

  await em.persistAndFlush(cart);
  return cart;
};

export const emptyCart = async (userId: string): Promise<void> => {
  const em = orm.em.fork();
  const cart = await em.findOne(Cart, { userId });

  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items.removeAll();
  await em.persistAndFlush(cart);
};

export const deleteCart = async ( cartId: string): Promise<void> => {
  const em = orm.em.fork();
  const cart = await em.findOne(Cart, { id: cartId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.isDeleted = true;
  await em.persistAndFlush(cart);
};
