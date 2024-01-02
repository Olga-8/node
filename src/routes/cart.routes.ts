import { Router } from 'express';
import { getCart, updateCart, emptyUserCart, deleteCart } from '../controllers/cart.controller';
import { isAuthor } from '../middleware/isAuthor';

const router = Router();

router.get('/profile/cart', getCart);
router.put('/profile/cart', updateCart);
router.delete('/profile/cart', emptyUserCart);
router.delete('/profile/cart', isAuthor, deleteCart);

export default router;
