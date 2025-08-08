// seeders/20230801-seed-users.ts
import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        password: "hashedpassword1",
        balance: 10000
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        password: "hashedpassword2",
        balance: 15000
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com",
        password: "hashedpassword3",
        balance: 20000
      }
      // You can add more users as needed
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {});
  }
};
