
import express from 'express';
import authRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import { authMiddleware } from './middleware/authMiddleware';
import { verifyToken } from './middleware/verifyToken';
import * as database from "./config/database";
import healthcheck from "express-healthcheck"
import logger from "./utils/logger";
import { getDurationInMilliseconds } from "./utils/getDurationInMilliseconds";
import morgan from "morgan";
const createServer = async () => {
  await database.connect()
  const app = express();
  app.use(morgan('combined'));
  app.use((req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
      const durationInMilliseconds = getDurationInMilliseconds(start);
      logger.info(`${req.method} ${req.originalUrl} [${res.statusCode}] ${durationInMilliseconds.toLocaleString()} ms`);
    });

    next();
  });

  app.use('/health', healthcheck({
	healthy: function () {
	  return { message: 'Application is healthy' };
	}
  }));
  app.use(express.json({ limit: '10kb' }));
  app.use('/api', authRoutes);
  app.use('/api', verifyToken);
  app.use(authMiddleware);
  app.use('/api', cartRoutes);
  app.use('/api', orderRoutes);
  app.use('/api', productRoutes);

  return app;
}

export { createServer };
