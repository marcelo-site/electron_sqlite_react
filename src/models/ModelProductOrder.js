import Sequelize from "sequelize";
import { database } from "../db.js";
import { ModelOrder } from "./ModelOrder.js";
import { ModelProduct } from "./ModelProduct.js";
await database.sync();

export const ModelProductOrder = database.define("productOrder", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

ModelOrder.belongsToMany(ModelProduct, {
  foreignKey: "orderId",
  constraints: true,
  through: {
    model: ModelProductOrder,
  },
});

ModelProduct.belongsToMany(ModelOrder, {
  foreignKey: "productId",
  constraints: true,
  through: {
    model: ModelProductOrder,
  },
});
