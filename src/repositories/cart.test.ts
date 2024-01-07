import mongoose from 'mongoose';
import {findCartByUserId, saveCart, softDeleteCart} from './cart.repository';
import {Cart, ICart} from '../entity/cart';
describe('findCartByUserId', () => {
	it('should find a cart by user ID', async () => {
		const mockCart = { userId: '123', isDeleted: false, items: [] };

		Cart.findOne = jest.fn().mockReturnValue({
			populate: jest.fn().mockReturnValue({
				exec: jest.fn().mockResolvedValue(mockCart)
			})
		});

		const cart = await findCartByUserId('123');

		expect(cart).toEqual(mockCart);
		expect(Cart.findOne).toHaveBeenCalledWith({ userId: '123', isDeleted: false });
	});
});
describe('softDeleteCart', () => {
	it('should soft delete a cart', async () => {

		Cart.updateOne = jest.fn().mockResolvedValue({});

		await softDeleteCart('123');

		expect(Cart.updateOne).toHaveBeenCalledWith({ _id: '123' }, { isDeleted: true });
	});
});
