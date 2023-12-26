import { Product } from '../entity/product';
import {orm} from '../index' 

export const getAllProducts = async (): Promise<Product[]> => {
  const em = orm.em.fork();
  return await em.find(Product, {});
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  const em = orm.em.fork();
  return await em.findOne(Product, { id: productId });
};
