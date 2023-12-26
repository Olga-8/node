import { ORDER_STATUS } from '../config';
import { Cart, CartItem } from './cart';
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Enum, Collection, OneToOne } from '@mikro-orm/core';
import { User } from './user';

@Entity()
export class Order {
    @PrimaryKey()
    id!: string;

    @ManyToOne(() => User)
    user!: User;

    @Property()
    cartId!: string;

    @OneToMany(() => CartItem, (item) => item.order)
    items = new Collection<CartItem>(this);

    //  Payment, Delivery
    @Property()
    paymentType!: string;

    @Property({ nullable: true })
    paymentAddress?: string;

    @Property({ nullable: true })
    paymentCreditCard?: string;

    @Property()
    deliveryType!: string;

    @Property()
    deliveryAddress!: string;

    @Property()
    comments!: string;

    @Enum(() => ORDER_STATUS)
    status!: ORDER_STATUS;

    @Property()
    total!: number;
}
