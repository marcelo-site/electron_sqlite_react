import electron from "electron";
import database from "../../../db.js";
import { ModelOrder } from "../../models/ModelOrder.js";
import { ModelProductOrder } from "../../models/ModelProductOrder.js";
import { ModelProduct } from "../../models/ModelProduct.js";

const { ipcMain } = electron;

ipcMain.on("createOrder", async (event, arg) => {
  try {
    await database.sync();
    const result = await ModelOrder.create({
      name: arg.name,
      value: +arg.value,
      quantity: +arg.quantity,
    });
    if (!result) throw new Error("Não foi possível fazer o registro!");

    await Promise.all(
      arg.products.map(async (item) => {
        await ModelProductOrder.create({
          orderId: result.dataValues.id,
          productId: item.id,
          quantity: item.quantity,
        });

        const product = await ModelProduct.findByPk(item.id);
        product.stock = product.stock - item.quantity;
        await product.save();
        // await ModelProduct.update({ stock: product.stock - item.quantity });
      })
    );

    event.reply("createOrder-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("createOrder-reply", error.message);
  }
});

ipcMain.on("getAllOrder", async (event, _) => {
  try {
    await database.sync();
    const result = await ModelOrder.findAll({ raw: true });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    event.reply("getAllOrder-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("getAllOrder-reply", error.message);
  }
});
