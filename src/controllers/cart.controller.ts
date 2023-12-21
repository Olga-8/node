import { Request, Response } from 'express';
import * as CartService from '../services/cart.service';
import * as UserService from '../repositories/user.repository';

export const getCart = (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be authorized user" }
      });
    }

    const userExist = UserService.findUserById(userId)

    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

    const cart = CartService.getOrCreateCart(userId);
    const total = CartService.calculateCartTotal(cart);
    res.status(200).json({
      data: { cart, total },
      error: null
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" }
    });
  }
};

export const updateCart = (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(403).json({ error: "You must be an authorized user" });
    }

    const userExist = UserService.findUserById(userId)

    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

    const { productId, count } = req.body;
    if (!productId || count == null) {
      return res.status(400).json({ error: "Products are not valid" });
    }

    const cart = CartService.updateCart(userId, productId, count);
    const total = CartService.calculateCartTotal(cart);

    res.status(200).json({ data: { cart, total } });

  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === 'Cart not found') {
        return res.status(404).json({ error: errorMessage });   
    }
    if (errorMessage === 'Product not found') {
        return res.status(404).json({ error: errorMessage });   
    }
        res.status(500).json({ error: "Internal Server Error" });
  }
};

export const emptyUserCart = (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be an authorized user" }
      });
    }
    
    CartService.emptyCart(userId);
    res.status(200).json({ data: { success: true }, error: null });

  } catch (error) {

    const errorMessage = (error as Error).message;

    if (errorMessage === 'Cart not found') {
      return res.status(404).json({ error: errorMessage });
    }
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" }
    });
  }
};

export const deleteCart = (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;  
    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be authorized user" }
      });
    }

    const userExist = UserService.findUserById(userId)

    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

      CartService.deleteCart(userId);
      res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  