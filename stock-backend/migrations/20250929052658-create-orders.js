"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      "orders",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        market_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "markets",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      }
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("orders");
  },
};
