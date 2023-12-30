import { Request, Response } from 'express';
import * as ProductRepository from '../repositories/product.repository';
import * as UserService from '../repositories/user.repository';



export const getAllProducts = async ( req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be an authorized user" }
      });
    }

    const userExist = await UserService.findUserById(userId)
    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

    const products = await ProductRepository.getAllProducts();
    res.status(200).json({ data: products, error: null });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" }
    });
  }
};

export const getProduct = async ( req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');
    
    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be an authorized user" }
      });
    }

    const userExist = await UserService.findUserById(userId)

    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

    const productId = req.params.productId;
    const product = await ProductRepository.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        data: null,
        error: { message: "No product with such id" }
      });
    }

    res.status(200).json({ data: product, error: null });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" }
    });
  }
};
