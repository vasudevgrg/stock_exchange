import {
  Model,
  Column,
  Table,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "kline_1w",
  timestamps: false,
})
export class Kline1w extends Model<Kline1w> {
  @Column(DataType.STRING)
  market!: string;

  @Column(DataType.DATE)
  start!: Date;

  @Column(DataType.DATE)
  end!: Date;

  @Column(DataType.STRING)
  open!: string;

  @Column(DataType.STRING)
  high!: string;

  @Column(DataType.STRING)
  low!: string;

  @Column(DataType.STRING)
  close!: string;

  @Column(DataType.STRING)
  volume!: string;

  @Column(DataType.STRING)
  quoteVolume!: string;

  @Column(DataType.INTEGER)
  trades!: number;
}