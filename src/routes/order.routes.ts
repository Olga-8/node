import { Router } from 'express';
import { checkoutCart }  from '../controllers/order.controller';

const router = Router();

router.post('/profile/cart/checkout', checkoutCart);

export default router;
