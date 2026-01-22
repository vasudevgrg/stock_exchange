import { Model } from "sequelize";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

interface OrderCreationAttributes {
  id: string;
  market: string;
  price: string;
  quantity: string;
  executedQuantity: string;
  side: "buy" | "sell";
}

@Table({
  tableName: "orders",
})
export class Order extends Model<Order, OrderCreationAttributes> {
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  market!: string;

  @Column(DataType.STRING)
  price!: string;

  @Column(DataType.STRING)
  quantity!: string;

  @Column(DataType.STRING)
  executedQuantity!: string;

  @Column(DataType.STRING)
  side!: string;
}
