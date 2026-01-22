import { Model } from "sequelize";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

interface TradeCreationAttributes {
  id: string;
  market: string;
  price: string;
  quantity: string;
  timestamp: string;
}

@Table({
    tableName:'trades'
})
export class Trade extends Model<Trade, TradeCreationAttributes> {
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  market!: string;

  @Column(DataType.STRING)
  price!: string;

  @Column(DataType.STRING)
  quantity!: string;

  @Column(DataType.STRING)
  timestamp!: string;

}
