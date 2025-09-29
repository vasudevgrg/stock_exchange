"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      "trades",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        seller_order_ids: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        buyer_order_ids: {
          type: DataTypes.JSONB,
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
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      }
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("trades");
  },
};
