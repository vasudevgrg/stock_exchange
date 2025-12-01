import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  HasOne,
  NotEmpty,
  BelongsToMany,
} from "sequelize-typescript";
import Trade from "./trade.model";
import { BaseModel } from "./common/base.model";
import UserMarket from "./user-market.model";
import User from "./user.model";

@Table({
  tableName: "markets",
  underscored: true,
  timestamps: false,
})
class Market extends BaseModel<Market> {
  @NotEmpty
  @Column(DataType.STRING)
  name: string;

  @NotEmpty
  @Column(DataType.INTEGER)
  current_price: number;

  // Relations

  // @HasOne(() => Trade, {
  //   foreignKey: "market_id",
  //   as: "trade",
  // })
  // trade?: Trade;

  @BelongsToMany(() => User, () => UserMarket)
  users?: User[];
}

export default Market;
