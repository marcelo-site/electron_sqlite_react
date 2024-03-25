import { ipcMain } from "electron";
import { database } from "../../db.js";
import { ModelProduct } from "../../models/ModelProduct.js";
import { ModelProductOrder } from "../../models/ModelProductOrder.js";

ipcMain.on("createProduct", async (event, arg) => {
  try {
    await database.sync();
    const { code, name, price, stock } = arg;
    const result = await ModelProduct.create({
      code: code,
      name,
      price: +price,
      stock: +stock,
    });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    event.reply("createProduct-reply", result.dataValues);
  } catch (error) {
    console.log(error);
    event.reply("createProduct-reply", { error: error.message });
  }
});

ipcMain.on("getAllProduct", async (event, _) => {
  try {
    await database.sync();
    const result = await ModelProduct.findAll({ raw: true });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    event.reply("getAllProductl-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("getAllProduct-reply", { error: error.message });
  }
});

ipcMain.on("getAllProduct", async (event, _) => {
  try {
    await database.sync();
    const result = await ModelProduct.findAll({
      raw: true,
    });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    event.reply("getAllProduct-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("getAllProduct-reply", { error: error.message });
  }
});

ipcMain.on("editProduct", async (event, arg) => {
  try {
    await database.sync();
    const product = await ModelProduct.update(arg, { where: { id: arg.id } });
    if (!product) throw new Error("Não foi possível fazer o registro!");

    event.reply("editProduct-reply", product);
  } catch (error) {
    console.log(error);
    event.reply("editProduct-reply", { error: error.message });
  }
});

ipcMain.on("deleteProduct", async (event, arg) => {
  try {
    await database.sync();
    const existsOrder = await ModelProductOrder.findOne({
      where: { productId: arg.id },
      raw: true,
    });

    if (existsOrder) {
      throw new Error(
        "Não é possível deletar produto, há registros dele em pedidos!"
      );
    }

    const product = await ModelProduct.destroy({ where: { id: arg.id } });
    if (!product) throw new Error("Não foi possível deletar esse produto!");

    event.reply("deleteProduct-reply", { id: arg.id });
  } catch (error) {
    console.log(error);
    event.reply("deleteProduct-reply", { error: error.message });
  }
});
