import { OrderEntity } from '../models/order';

const orders: OrderEntity[] = [];

export const saveOrder = (order: OrderEntity): OrderEntity => {
  orders.push(order);
  return order;
};
