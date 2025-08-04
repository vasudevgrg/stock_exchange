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
} from "sequelize-typescript";
import Order from "./order.model";
import { BaseModel } from "./base.model";

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

  checkBalance(amount: number): boolean {
    return this.balance >= amount;
  }

    addBalance(amount: number) {
     this.balance += amount;
     return this;
  }
}

export default User;
