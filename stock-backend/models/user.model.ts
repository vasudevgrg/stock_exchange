import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
  Default,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import Order from "./order.model";
import { BaseModel } from "./common/base.model";
import UserMarket from "./user-market.model";
import Market from "./market.model";

@Table({
  tableName: "users",
  underscored: true,
  timestamps: false,
})
class User extends BaseModel<User> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: true,
    },
  })
  password: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  balance: number;

  @HasMany(() => Order, {
    foreignKey: "user_id",
    as: "orders",
  })
  orders?: Order[];

  @BelongsToMany(() => Market, () => UserMarket)
  markets?: Market[];

  checkBalance(amount: number): boolean {
    console.log('amount: ', amount);
    console.log('this.balance >= amount;: ', this.balance >= amount);
    return this.balance >= amount;
  }

  addBalance(amount: number) {
    this.balance += amount;
    return this;
  }
}

export default User;
