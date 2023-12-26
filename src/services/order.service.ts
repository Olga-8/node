import { Order } from '../entity/order';
import { Cart } from '../entity/cart';
import { User } from '../entity/user';
import { v4 as uuidv4 } from 'uuid';
import { ORDER_STATUS } from '../config';
import { calculateCartTotal } from './cart.service';
import { orm } from '../index';

export const createOrderFromCart = async (userId: string): Promise<Order> => {
    const em = orm.em.fork();

    try {
        const user = await em.findOne(User, { id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        const cart = await em.findOne(Cart, { userId: user.id, isDeleted: false });

        await cart?.items.init();

        if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        const order = new Order();
        order.id = uuidv4();
        order.user = user;
        order.cartId = cart.id;
        order.items.set(cart.items.getItems());
        order.total = calculateCartTotal(cart);
        // payment и delivery 
        order.paymentType = '';
        order.deliveryType = '';
        order.comments = '';
        order.status = ORDER_STATUS.Created;

        await em.persistAndFlush(order);

        cart.items.removeAll();
        await em.persistAndFlush(cart);

        return order;
		
    } catch (error) {
        console.error('Error in createOrderFromCart:', error);
        throw error;
    }
};
