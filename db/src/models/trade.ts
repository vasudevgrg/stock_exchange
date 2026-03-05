
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "trades",
  timestamps: false
})
export class Trade extends Model {

  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  market!: string;

  @Column(DataType.DECIMAL)
  price!: number;

  @Column(DataType.DECIMAL)
  quantity!: number;

  @Column(DataType.DATE)
  timestamp!: Date;
}