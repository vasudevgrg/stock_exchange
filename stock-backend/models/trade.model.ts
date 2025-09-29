import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Market from "./market.model";

interface TradeCreationAttributes {
  seller_order_ids: object;
  buyer_order_ids: object;
  market_id: number;
  price: number;
  quantity: number;
}

@Table({
  tableName: "trades",
  underscored: true,
  timestamps: false,
})
class Trade extends Model<Trade, TradeCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.JSONB)
  seller_order_ids: object;

  @AllowNull(false)
  @Column(DataType.JSONB)
  buyer_order_ids: object;

  @ForeignKey(() => Market)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  market_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  // Associations

  // @BelongsTo(() => Market, {
  //   foreignKey: "market_id",
  //   as: "market",
  // })
  // market?: Market;
}

export default Trade;
