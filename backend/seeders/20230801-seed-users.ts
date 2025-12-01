// seeders/20230801-seed-users.ts
import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Alice",
        email: "alice@example.com",
        password: "hashedpassword1",
        balance: 10000
      },
      {
        name: "Bob",
        email: "bob@example.com",
        password: "hashedpassword2",
        balance: 15000
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        password: "hashedpassword3",
        balance: 20000
      },
            {
        name: "Charlie",
        email: "charli1e@example.com",
        password: "hashedpassword31",
        balance: 20000
      },      {
        name: "Charli2e",
        email: "charli12e@example.com",
        password: "hashedpassword3",
        balance: 20000
      },      {
        name: "Charlie",
        email: "charlie2@example.com",
        password: "hashe2dpassword3",
        balance: 20000
      },      {
        name: "Charlie",
        email: "charli23e@example.com",
        password: "hashedpassword3",
        balance: 20000
      },      {
        name: "Charl3ie",
        email: "charli3e@example.com",
        password: "hashedpassword3",
        balance: 20000
      },      {
        name: "Charlie",
        email: "charl4ie@example.com",
        password: "hashedpassword3",
        balance: 20000
      },      {
        name: "Charlie",
        email: "charl5ie@example.com",
        password: "hashedpassword3",
        balance: 20000
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {});
  }
};
