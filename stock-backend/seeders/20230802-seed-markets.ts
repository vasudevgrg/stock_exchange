// seeders/20230802-seed-markets.ts
import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("markets", [
      {
        id: 1,
        name: "BTC/INR",
        last_trade_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: "ETH/INR",
        last_trade_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: "BNB/INR",
        last_trade_id: null,
        created_at: new Date(),
        updated_at: new Date()
      }
      // Add more markets as required
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("markets", {});
  }
};
