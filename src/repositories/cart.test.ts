import {findCartByUserId} from './cart.repository';
import {Cart} from '../entity/cart';
describe('findCartByUserId', () => {
	it('should find a cart by user ID', async ():Promise<void> => {
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
jest.mock('mongoose', () => {
	const actualMongoose = jest.requireActual('mongoose');
	return {
		...actualMongoose,
		Document: jest.fn().mockImplementation(() => ({
			save: jest.fn()
		}))
	};
});
