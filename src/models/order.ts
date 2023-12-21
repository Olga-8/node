import  { ORDER_STATUS } from "../config";
import { CartItemEntity } from "./cart";

export interface OrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
