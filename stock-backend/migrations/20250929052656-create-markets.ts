
import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
      "markets",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        current_price: {
          type: DataTypes.INTEGER,
          allowNull:  false
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      }
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("markets");
  },
};
