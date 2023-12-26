import { Product } from './product';
import { Entity, PrimaryKey, ManyToOne, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Order } from './order';

@Entity()
export class Cart {
    @PrimaryKey()
    id!: string;

    @Property()
    userId!: string;

    @Property()
    isDeleted!: boolean;

    @OneToMany(() => CartItem, (item) => item.cart)
    items = new Collection<CartItem>(this);
}

@Entity()
export class CartItem {
    @PrimaryKey()
    id!: string;

    @Property()
    product!: Product;

    @Property()
    count!: number;

    @ManyToOne(() => Cart)
    cart!: Cart;

    @ManyToOne(() => Order)
    order!: Order;
}
