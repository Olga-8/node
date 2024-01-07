import { IProduct, Product } from '../entity/product';

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
  return await Product.findById(productId)
}
