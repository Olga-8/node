import { Order } from '../entity/order';
import {orm} from '../index' 

export const saveOrder = async ( order: Order): Promise<Order> => {
  const em = orm.em.fork();
  await em.persistAndFlush(order);
  return order;
};
