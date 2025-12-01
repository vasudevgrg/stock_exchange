import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  NotEmpty,
  IsNumeric,
} from "sequelize-typescript";
import { BaseModel } from "./common/base.model";
import Market from "./market.model";
import User from "./user.model";

@Table({
  tableName: "user-markets",
  underscored: true,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["user_id", "market_id"],
    },
  ],
})
class UserMarket extends BaseModel<UserMarket> {
  @ForeignKey(() => User)
  @NotEmpty
  @Column(DataType.INTEGER)
  user_id: number;

  @ForeignKey(() => Market)
  @NotEmpty
  @Column(DataType.INTEGER)
  market_id: number;

  @NotEmpty
  @IsNumeric
  @Column(DataType.INTEGER)
  quantity: number;

  @BelongsTo(() => Market, {
    foreignKey: "market_id",
    as: "market",
  })
  market?: Market;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    as: "user",
  })
  user?: User;
}

export default UserMarket;
