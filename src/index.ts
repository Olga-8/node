import express from 'express';
import { Connection, EntityManager, EntityRepository, IDatabaseDriver, MikroORM, RequestContext } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import { authMiddleware } from './middleware/authMiddleware';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/user.routes';
import { PORT } from './config';


export let orm: MikroORM<IDatabaseDriver<Connection>>
async function main() {
 
  orm = await MikroORM.init(mikroOrmConfig);
  console.log('MikroORM initialized');

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
}

main().catch(err => {
  console.error('Ошибка при инициализации приложения:', err);
});
