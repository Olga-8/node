import { MikroORM } from '@mikro-orm/core';
import { Cart } from './entity/cart';
import { CartItem } from './entity/cart';
import { Order } from './entity/order';
import { Product } from './entity/product';
import { User } from './entity/user';

export default {
  entities: [User, Product, Order, Cart, CartItem],
  dbName: 'node_gmp',
  type: 'postgresql',
  user: 'node_gmp',
  password: 'password123',
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    path: './src/migrations',
    pattern: /^[\w-]+\d+\.[tj]s$/, // для поиска файлов миграции
  },

} as Parameters<typeof MikroORM.init>[0];
