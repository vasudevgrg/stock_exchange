import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
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
  timestamps: false,
})
export class Order extends Model<Order, OrderCreationAttributes> {

  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  market!: string;

  @Column(DataType.DECIMAL)
  price!: string;

  @Column(DataType.DECIMAL)
  quantity!: string;

  @Column(DataType.DECIMAL)
  executedQuantity!: string;

  @Column(DataType.ENUM("buy", "sell"))
  side!: "buy" | "sell";
}