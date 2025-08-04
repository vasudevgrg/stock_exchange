import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  HasOne,
  BelongsTo,
  NotEmpty,
} from "sequelize-typescript";
import Trade from "./trade.model";
import { BaseModel } from "./base.model";

@Table({
  tableName: "markets",
  underscored: true,
  timestamps: true,
})
class Market extends BaseModel<Market> {

  @NotEmpty
  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => Trade)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  last_trade_id: number | null;

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Date;

  // Relations

  @HasOne(() => Trade, {
    foreignKey: "market_id",
    as: "trade",
  })
  trade?: Trade;

  
}

export default Market;
