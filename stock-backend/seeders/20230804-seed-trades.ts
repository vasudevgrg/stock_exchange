// seeders/20230804-seed-trades.ts
import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    const trades = [
      {
        id: 1,
        seller_order_ids: JSON.stringify([16]),
        buyer_order_ids: JSON.stringify([1]),
        market_id: 1,
        price: 3010000,
        quantity: 2,
      },
      {
        id: 2,
        seller_order_ids: JSON.stringify([17]),
        buyer_order_ids: JSON.stringify([2]),
        market_id: 2,
        price: 3120000,
        quantity: 1,
      },
      {
        id: 3,
        seller_order_ids: JSON.stringify([18]),
        buyer_order_ids: JSON.stringify([3, 4]),
        market_id: 1,
        price: 3200000,
        quantity: 3,
      },
      {
        id: 4,
        seller_order_ids: JSON.stringify([19, 20]),
        buyer_order_ids: JSON.stringify([5]),
        market_id: 2,
        price: 3250000,
        quantity: 2,
      },
      {
        id: 5,
        seller_order_ids: JSON.stringify([21]),
        buyer_order_ids: JSON.stringify([6]),
        market_id: 1,
        price: 3270000,
        quantity: 4,
      },
      {
        id: 6,
        seller_order_ids: JSON.stringify([22]),
        buyer_order_ids: JSON.stringify([7, 8]),
        market_id: 1,
        price: 3300000,
        quantity: 1,
      },
      {
        id: 7,
        seller_order_ids: JSON.stringify([23]),
        buyer_order_ids: JSON.stringify([9]),
        market_id: 2,
        price: 3330000,
        quantity: 2,
      },
      {
        id: 8,
        seller_order_ids: JSON.stringify([24, 25]),
        buyer_order_ids: JSON.stringify([10, 11]),
        market_id: 1,
        price: 3350000,
        quantity: 2,
      },
      // Add more as needed, referencing existing order IDs
    ];
    await queryInterface.bulkInsert("trades", trades);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("trades", {});
  }
};
