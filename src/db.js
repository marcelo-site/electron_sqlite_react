import Sequelize from "sequelize";
import SQLite from "sqlite3";

export const database = new Sequelize({
  dialect: "sqlite",
  storage: "./public/database.sqlite", // or ':memory:'
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
    // useUTC: false,
  },
});
