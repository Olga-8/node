import { MikroORM } from '@mikro-orm/core';
import { User } from './src/entity/user';
import { Product } from './src/entity/product';
import { Cart } from './src/entity/cart';
import { CartItem } from './src/entity/cart';
import { Order } from './src/entity/order';
import { ORDER_STATUS } from './src/config';
import { v4 as uuid } from 'uuid';

async function testDatabase(orm: MikroORM) {
  const em = orm.em.fork();

  const user = new User();
  user.id = uuid();
  user.email = 'user@example.com';
  user.password = 'password123'
  user.role = 'user';
  em.persist(user);

  const book = new Product();
  book.id = uuid();
  book.title = 'Book';
  book.description = 'Interesting book';
  book.price = 200;
  em.persist(book);

  const pen = new Product();
  pen.id = uuid();
  pen.title = 'Pen';
  pen.description = 'Cute pen';
  pen.price = 20;
  em.persist(pen);

  await em.flush();

  const cart = new Cart();
  cart.id = uuid();
  cart.userId = user.id;
  cart.isDeleted = false;
  em.persist(cart);

  const order = new Order();
  order.id = uuid();
  order.user = user;
  order.cartId = cart.id;
  order.paymentType = 'paypal';
  order.deliveryType = 'post';
  order.deliveryAddress = 'London';
  order.comments = '';
  order.status = ORDER_STATUS.Created;
  order.total = 500;
  em.persist(order);

  const cartItem1 = new CartItem();
  cartItem1.id = uuid();
  cartItem1.product = book;
  cartItem1.count = 2;
  cartItem1.cart = cart;
  cartItem1.order = order;
  em.persist(cartItem1);

  const cartItem2 = new CartItem();
  cartItem2.id = uuid();
  cartItem2.product = pen;
  cartItem2.count = 5;
  cartItem2.cart = cart;
  cartItem2.order = order;
  em.persist(cartItem2);

  await em.flush();
}

(async () => {
  const orm = await MikroORM.init();
  await testDatabase(orm);
  await orm.close(true);
})();
//npx ts-node test_bd.ts