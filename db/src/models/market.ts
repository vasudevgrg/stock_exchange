import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName: "markets",
  timestamps: false
})
export class Market extends Model {

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DATE)
  time!: Date;

  @Column(DataType.DECIMAL)
  volume!: number;

  @Column(DataType.DECIMAL)
  price!: number;

}