import { CartEntity } from '../models/cart';

const carts: CartEntity[] = [];

export const findCartByUserId = (userId: string): CartEntity | undefined => {
  return carts.find(cart => cart.userId === userId && !cart.isDeleted);
};

export const saveCart = (cartItem: CartEntity): CartEntity => {
  const existingIndex = carts.findIndex(cart => cart.id === cartItem.id);

  if (existingIndex >= 0) {
    carts[existingIndex] = cartItem;
  } else {
    carts.push(cartItem);
  }
  return cartItem;
};

export const softDeleteCart = (cartId: string): void => {
  const cart = carts.find(cart => cart.id === cartId);
  
  if (cart) {
    cart.isDeleted = true;
  }
};
