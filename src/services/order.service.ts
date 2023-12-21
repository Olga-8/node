import { OrderEntity } from '../models/order';
import { emptyCart, calculateCartTotal } from './cart.service';
import { v4 as uuidv4 } from 'uuid';
import { findCartByUserId } from '../repositories/cart.repository';
import { ORDER_STATUS }  from '../config'
import { saveOrder } from '../repositories/order.repository';

export const createOrderFromCart = (userId: string): OrderEntity => {
  const cart = findCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const order: OrderEntity = {
      id: uuidv4(),
      userId: userId,
      cartId: cart.id,
      items: cart.items,
      total: calculateCartTotal(cart),
      payment: {
          type: '',
          address: undefined,
          creditCard: undefined
      },
      delivery: {
          type: '',
          address: undefined
      },
      comments: '',
      status: ORDER_STATUS.Created
  };

  saveOrder(order);
  emptyCart(userId);

  return order;
};
