import electron from "electron";
import { database } from "../../db.js";
import { ModelOrder } from "../../models/ModelOrder.js";
import { ModelProductOrder } from "../../models/ModelProductOrder.js";
import { ModelProduct } from "../../models/ModelProduct.js";
import { Op } from "sequelize";

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
      })
    );

    event.reply("createOrder-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("createOrder-reply", error.message);
  }
});

ipcMain.on("getAllOrder", async (event, arg) => {
  try {
    await database.sync();
    const result = await ModelOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: arg.init,
          [Op.lte]: arg.end,
        },
      },
      raw: true,
    });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    event.reply("getAllOrder-reply", result);
  } catch (error) {
    console.log(error);
    event.reply("getAllOrder-reply", error.message);
  }
});

ipcMain.on("getAllProductsOrder", async (event, data) => {
  try {
    await database.sync();
    const result = await ModelOrder.findAll({
      where: { id: data.id },
      include: [
        {
          model: ModelProduct,
        },
      ],
      raw: true,
    });

    if (!result) throw new Error("Não foi possível fazer o registro!");

    const productOrders = [];

    await Promise.all(
      result.map(async (item) => {
        if (item["products.id"] === null) {
          await ModelOrder.destroy({ where: { id: item.id } });
        } else {
          const product = {
            id: item["products.id"],
            name: item["products.name"],
            price: item["products.price"],
            quantity: item["products.productOrder.quantity"],
            stock: item["products.stock"],
            productOrderId: item["products.productOrder.id"],
          };

          productOrders.push(product);
        }
      })
    );

    event.reply("getAllProductsOrder-reply", productOrders);
  } catch (error) {
    console.log(error);
    event.reply("getAllProductsOrder-reply", error.message);
  }
});

ipcMain.on("deleteOrder", async (event, arg) => {
  try {
    await database.sync();
    const orders = await ModelProductOrder.findAll({
      where: { orderId: arg.id },
      raw: true,
    });

    const arrIds = orders.map((item) => item.id);
    const ordersDel = await ModelProductOrder.destroy({
      where: { id: arrIds },
    });

    await Promise.all(
      orders.map(async (item) => {
        const product = await ModelProduct.findByPk(item.productId);
        product.stock = product.stock + item.quantity;
        await product.save();
      })
    );
    const product = await ModelOrder.destroy({ where: { id: arg.id } });
    if (!product) throw new Error("Não foi possível fazer o registro!");

    event.reply("deleteOrder-reply", { id: arg.id });
  } catch (error) {
    console.log(error);
    event.reply("deleteOrder-reply", error.message);
  }
});

ipcMain.on("editOrder", async (event, arg) => {
  try {
    const { name, quantity, value } = arg;

    if (!!name || !!quantity || !!value) {
      const obj = {};
      if (!!name) obj.name = name;
      if (!!quantity) obj.quantity = quantity;
      if (!!value) obj.value = value;
      await ModelOrder.update(obj, { where: { id: arg.id } });
    }

    if (!!arg.products.length) {
      await Promise.all(
        arg.products.map(async (item) => {
          if (item.edit) {
            await ModelProductOrder.update(
              { quantity: item.quantity },
              {
                where: { productId: item.productId },
              }
            );
            await ModelProduct.update(
              { stock: item.stock },
              {
                where: { id: item.productId },
              }
            );
          }
        })
      );
    }
    event.reply("editOrder-reply", { id: arg.id });
  } catch (error) {
    event.reply("editOrder-reply", error?.message);
  }
});

ipcMain.on("deleteProductOrder", async (event, arg) => {
  try {
    const delProductOrder = await ModelProductOrder.destroy({
      where: { id: arg.productOrderId },
    });

    const stock = arg.quantity + arg.stock;
    await ModelProduct.update({ stock }, { where: { id: arg.id } });
    event.reply("deleteProductOrder-reply", {
      count: delProductOrder,
      id: arg.id,
    });
  } catch (error) {
    console.log(error);
    event.reply("deleteProductOrder-reply", error.message);
  }
});
