import { Model } from "sequelize";
import { Column } from "sequelize-typescript";

@Table({ tableName: 'kline_1m', timestamps: false })
export class Kline1m extends Model {
  @Column market!: string;
  @Column start!: Date;
  @Column end!: Date;
  @Column open!: string;
  @Column high!: string;
  @Column low!: string;
  @Column close!: string;
  @Column volume!: string;
  @Column quoteVolume!: string;
  @Column trades!: number;
}