import { Order, IOrder } from '../entity/order';
import { Cart}  from '../entity/cart';
import { User } from '../entity/user';
import { v4 as uuidv4 } from 'uuid';
import { ORDER_STATUS } from '../config';
import { calculateCartTotal } from './cart.service';

export const createOrderFromCart = async (userId: string): Promise<IOrder> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const cart = await Cart.findOne({ userId: user._id, isDeleted: false });
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const total = await calculateCartTotal(cart._id);

    const order = new Order({
      _id: uuidv4(),
      user: user._id,
      cartId: cart._id,
      items: cart.items,
      total: total,
      paymentType: '', // 
      deliveryType: '', // 
      comments: '',
      status: ORDER_STATUS.Created
    });

    await order.save();

    cart.items = [];
    await cart.save();

    return order;

  } catch (error) {
    console.error('Error in createOrderFromCart:', error);
    throw error;
  }
};

