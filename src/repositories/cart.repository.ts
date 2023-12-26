import { Cart } from '../entity/cart';
import {orm} from '../index' 

export const findCartByUserId = async ( userId: string): Promise<Cart | null> => {
  const em = orm.em.fork();
  return await em.findOne(Cart, { userId, isDeleted: false });
};

export const saveCart = async ( cart: Cart): Promise<Cart> => {
  const em = orm.em.fork();
  await em.persistAndFlush(cart);
  return cart;
};

export const softDeleteCart = async ( cartId: string): Promise<void> => {
  const em = orm.em.fork();
  const cart = await em.findOne(Cart, { id: cartId });

  if (cart) {
    cart.isDeleted = true;
    await em.persistAndFlush(cart);
  }
};
