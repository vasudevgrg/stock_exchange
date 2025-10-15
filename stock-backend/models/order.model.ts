import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";
import Market from "./market.model";
import { Status } from "./enums/status-enum";

interface OrderCreationAttributes {
  type: string;
  price: number;
  quantity: number;
  market_id: number;
  user_id: number;
}

@Table({
  tableName: "orders",
  underscored: true,
  timestamps: false,
})
class Order extends Model<Order, OrderCreationAttributes>{
  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @ForeignKey(() => Market)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  market_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.ENUM) 
  status: Status;

  // Associations

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    as: "user",
  })
  user?: User;

  @BelongsTo(() => Market, {
    foreignKey: "market_id",
    as: "market",
  })
  market?: Market;
}

export default Order;
