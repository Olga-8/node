
import {findCartByUserId, saveCart, softDeleteCart} from './cart.repository';
import { Cart } from '../entity/cart';
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
describe('saveCart', () => {
	it('should save a cart', async () => {
		const mockCart = { save: jest.fn().mockResolvedValue(true) };

		const result = await saveCart(mockCart);

		expect(mockCart.save).toHaveBeenCalled();
		expect(result).toBeTruthy();
	});
});
describe('softDeleteCart', () => {
	it('should soft delete a cart', async () => {

		Cart.updateOne = jest.fn().mockResolvedValue({});

		await softDeleteCart('123');

		expect(Cart.updateOne).toHaveBeenCalledWith({ _id: '123' }, { isDeleted: true });
	});
});
