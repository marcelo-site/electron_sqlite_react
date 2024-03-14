import styles from "./CreateOrder.module.css";

import { useEffect, useState } from "react";
import { FormOrder } from "../../components/FormOrder";

import { getAllProduct } from "../../controllers/product/renderer.js";
import { createOrder } from "../../controllers/order/renderer.js";
import { TabaleProduct } from "../../components/TableProduct";
import { TableOrder } from "../../components/TableOrder/index.jsx";

import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { BtnAddOrder } from "./BtnAddProduct.jsx";

export const CreateOrderPage = () => {
  const [dataTable, setDataTable] = useState();
  const [order, setOrder] = useState({
    name: "",
    quantity: 0,
    value: 0,
    products: [],
  });

  const handleOrder = (e) => {
    setOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = (data) => {
    const newDataTable = dataTable.map((item) => {
      if (item.id === data.id) {
        item.active = false;
        item.stock = item.stock - 1;
      }
      return item;
    });
    setDataTable(newDataTable);

    const value = { ...data, quantity: 1 };
    setOrder((prev) => ({ ...prev, products: [...prev.products, value] }));
  };

  const handleQuantity = (id, n) => {
    const newOrderProducts = order.products.map((item) => {
      if (item.id === id) item.quantity = item.quantity + n;
      return item;
    });
    setOrder((prev) => ({ ...prev, products: newOrderProducts }));

    const newDataTable = dataTable.map((item) => {
      if (item.id === id) item.stock = item.stock + -n;
      return item;
    });
    setDataTable(newDataTable);
  };

  const actions = (data) => <BtnAddOrder data={data} handleAdd={handleAdd} />;

  const deleteProductOrder = (data) => {
    const newDataTable = dataTable.map((item) => {
      if (item.id === data.id) {
        item.active = true;
        item.stock = item.stock + data.quantity;
      }
      return item;
    });

    setDataTable(newDataTable);
    setOrder((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item.id !== data.id),
    }));
  };

  const actionOrder = (data) => (
    <Trash onClick={() => deleteProductOrder(data)} />
  );

  useEffect(() => {
    let newOrder = order.products.reduce(
      (acc, item) => {
        acc.value = acc.value + item.quantity * item.price;
        acc.quantity = acc.quantity + item.quantity;
        return acc;
      },
      { value: 0, quantity: 0 }
    );
    setOrder({ ...order, ...newOrder });
  }, [order.products]);

  useEffect(() => {
    getAllProduct().then((res) => {
      setDataTable(() =>
        res.map((item) => ({
          ...item,
          active: true,
        }))
      );
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Crinado Pedido</h1>
      <FormOrder order={order} handleChange={handleOrder} />
      {!!order.products.length && (
        <>
          <h2>Pedido</h2>
          <TableOrder
            dataTable={order.products}
            handleQuantity={handleQuantity}
            actions={actionOrder}
          />
          <button onClick={() => createOrder(order)}>Cadastrar</button>
        </>
      )}
      {dataTable && (
        <>
          <h2>Produtos</h2>
          <TabaleProduct dataTable={dataTable} actions={actions} />
        </>
      )}
    </div>
  );
};
