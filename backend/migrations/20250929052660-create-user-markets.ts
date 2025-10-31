"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
      "user-markets",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
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
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: true,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      }
    );
    await queryInterface.addIndex('user-markets', ['user_id', 'market_id'], {
      unique: true,
      name: 'user_market_unique'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("user-markets");
  },
};
