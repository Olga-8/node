
import express from 'express';
import authRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import { authMiddleware } from './middleware/authMiddleware';
import { verifyToken } from './middleware/verifyToken';
import * as database from "./config/database";

const server = async () => {
  await database.connect()
  
  const app = express();
  app.use(express.json({ limit: '10kb' }));
  app.use('/api', authRoutes);
  app.use('/api', verifyToken);
  app.use(authMiddleware);
  app.use('/api', cartRoutes);
  app.use('/api', orderRoutes);
  app.use('/api', productRoutes);

  return app;
}

export { server };
