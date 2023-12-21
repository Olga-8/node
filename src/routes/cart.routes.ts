import { Router } from 'express';
import { getCart, updateCart, emptyUserCart, deleteCart } from '../controllers/cart.controller';

const router = Router();

router.get('/profile/cart', getCart);
router.put('/profile/cart', updateCart);
router.delete('/profile/cart', emptyUserCart);
router.delete('/profile/cart', deleteCart);

export default router;
