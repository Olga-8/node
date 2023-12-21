import express from 'express';
import { authMiddleware }  from './middleware/authMiddleware'
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/user.routes';
import { PORT } from './config'

const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use(authMiddleware);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
