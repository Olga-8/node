import { Request, Response } from 'express';
import * as OrderService from '../services/order.service';
import * as UserService from '../repositories/user.repository';


export const checkoutCart = (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be an authorized user" }
      });
    }

const userExist = UserService.findUserById(userId)

    if (userId && !userExist) {
      return res.status(401).json({
        data: null,
        error: { message: "User not authorized" }
      });
    }

    const order = OrderService.createOrderFromCart(userId);

    res.status(200).json({ data: { order }, error: null });
    
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage === 'Cart is empty') {
        res.status(400).json({ data: null, error: errorMessage });
    }
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};
