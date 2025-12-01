// seeders/20230803-seed-orders.ts
import { QueryInterface } from "sequelize";
import { Status } from "../models/enums/status-enum";

export = {
  up: async (queryInterface: QueryInterface) => {
    const orders: any[] = [];

    // --- 40 matching pairs (80 orders) ---
    // Buyers: users 1–5
    // Sellers: users 6–10
    for (let k = 1; k <= 40; k++) {
      const price = 1000 + k * 10;         // 1010, 1020, ...
      const buyQuantity = (k % 5) + 1;     // 1..5

      // Sell quantity variation for partial fills
      const sellQuantity =
        (k % 4 === 0)
          ? buyQuantity + 1
          : (k % 3 === 0)
            ? Math.max(1, buyQuantity - 1)
            : buyQuantity;

      // Buy order (users 1–5)
      orders.push({
        type: "buy",
        price,
        quantity: buyQuantity,
        market_id: 1,
        user_id: ((k - 1) % 5) + 1,    // 1..5
        status: Status.PENDING
      });

      // Sell order (users 6–10)
      orders.push({
        type: "sell",
        price,
        quantity: sellQuantity,
        market_id: 1,
        user_id: 6 + ((k - 1) % 5),    // 6..10
        status: Status.PENDING
      });
    }

    // --- 10 buy depth orders (users 1–5) ---
    for (let j = 1; j <= 10; j++) {
      const price = 1000 + (40 - j) * 8;

      orders.push({
        type: "buy",
        price,
        quantity: (j % 4) + 1,
        market_id: 1,
        user_id: ((j - 1) % 5) + 1,    // 1..5
        status: Status.PENDING
      });
    }

    // --- 10 sell depth orders (users 6–10) ---
    for (let j = 1; j <= 10; j++) {
      const price = 1000 + (40 + j) * 12;

      orders.push({
        type: "sell",
        price,
        quantity: (j % 5) + 1,
        market_id: 1,
        user_id: 6 + ((j - 1) % 5),    // 6..10
        status: Status.PENDING
      });
    }

    // Final check
    if (orders.length !== 100) {
      throw new Error(`Seeder expects 100 orders but generated ${orders.length}`);
    }

    await queryInterface.bulkInsert("orders", orders);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("orders", {});
  }
};
