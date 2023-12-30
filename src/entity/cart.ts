// import { Product } from './product';
// import { Entity, PrimaryKey, ManyToOne, Property, OneToMany, Collection } from '@mikro-orm/core';
// import { Order } from './order';

// @Entity()
// export class Cart {
//     @PrimaryKey()
//     id!: string;

//     @Property()
//     userId!: string;

//     @Property()
//     isDeleted!: boolean;

//     @OneToMany(() => CartItem, (item) => item.cart)
//     items = new Collection<CartItem>(this);
// }

// @Entity()
// export class CartItem {
//     @PrimaryKey()
//     id!: string;

//     @Property()
//     product!: Product;

//     @Property()
//     count!: number;

//     @ManyToOne(() => Cart)
//     cart!: Cart;

//     @ManyToOne(() => Order)
//     order!: Order;
// }
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from './product';
import { IUser } from './user';

interface ICartItem {
  product: IProduct;
  count: number;
}

interface ICart {
  _id: string;
  userId: IUser;
  items: ICartItem[];
  isDeleted: boolean;
}

const cartItemSchema = new mongoose.Schema<ICartItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true }
});

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);

const cartSchema = new mongoose.Schema<ICart>({
  _id: { type: String, default: () => uuidv4() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  isDeleted: { type: Boolean, required: true }
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export { Cart, CartItem, ICart, ICartItem };