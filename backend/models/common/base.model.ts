import {
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  Default,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";

class BaseModel<T extends object> extends Model<T> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  declare id: number;

  // @Default(DataTypes.NOW)
  // @Column(DataTypes.DATE)
  // declare created_at: Date;

  // @AllowNull(true)
  // @Column(DataTypes.DATE)
  // declare updated_at: Date | null;

  @AllowNull(true)
  @Column(DataTypes.DATE)
  declare deleted_at: Date | null;
}

export { BaseModel }