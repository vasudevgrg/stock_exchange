// seeders/20230803-seed-orders.ts
import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    const orders = [];

    // 15 Buy orders
    for (let i = 1; i <= 15; i++) {
      orders.push({
        id: i,
        type: "buy",
        price: 3000000 + i * 10000,
        quantity: 1 + (i % 3),
        market_id: (i % 2) + 1,     // Alternate between Market 1 and 2
        user_id: ((i - 1) % 2) + 1  // Alternate between User 1 and 2
      });
    }

    // 15 Sell orders
    for (let i = 16; i <= 30; i++) {
      orders.push({
        id: i,
        type: "sell",
        price: 3050000 + (i - 15) * 9000,
        quantity: 1 + ((i - 1) % 4),
        market_id: ((i - 1) % 2) + 1,
        user_id: ((i - 1) % 2) + 1
      });
    }

    await queryInterface.bulkInsert("orders", orders);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("orders", {});
  }
};
