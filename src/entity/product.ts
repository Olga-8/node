import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: string; // UUID

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}
