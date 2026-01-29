import { Model } from "sequelize";
import { Table } from "sequelize-typescript";

@Table({
    tableName: 'markets'
})
export class Market extends Model {
    name!: string;
    time!: Date;
    volume!: string;
    price!: string
}