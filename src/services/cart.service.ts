import { CartEntity, CartItemEntity } from '../models/cart';
import { findCartByUserId, saveCart, softDeleteCart } from '../repositories/cart.repository';
import { getProductById } from '../repositories/product.repository';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateCart = (userId: string): CartEntity => {
    let cart = findCartByUserId(userId);

    if (!cart) {
      cart = {
        id: uuidv4(),
        userId,
        isDeleted: false,
        items: []
      };
      saveCart(cart);
    }
    return cart;
};
  
export const calculateCartTotal = (cart: CartEntity): number => {
	return cart.items.reduce((total, item) => total + (item.product.price * item.count), 0);
};
  
export const updateCart = (userId: string, productId: string, count: number): CartEntity => {
	const cart = findCartByUserId(userId);
	if (!cart) throw new Error('Cart not found');

	const product = getProductById(productId);
	if (!product) throw new Error('Product not found');

	const existingItemIndex = cart.items.findIndex(item => item.product.id === productId);
	if (existingItemIndex >= 0) {
		if (count > 0) {
		cart.items[existingItemIndex].count = count;
		} else {
		
		cart.items.splice(existingItemIndex, 1);
		}
	} else if (count > 0) {
		cart.items.push({ product, count });
	}

	return saveCart(cart);
};

export const emptyCart = (userId: string): void => {
	const cart = findCartByUserId(userId);

	if (!cart) {
		throw new Error('Cart not found');
	}
	cart.items = [];
	saveCart(cart);
};

export const deleteCart = (cartId: string): void => {
softDeleteCart(cartId);
};
