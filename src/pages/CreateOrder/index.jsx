import styles from "./CreateOrder.module.css";

import { useEffect, useState } from "react";
import { FormOrder } from "../../components/FormOrder";

import { getAllProduct } from "../../controllers/product/renderer.js";
import { createOrder } from "../../controllers/order/renderer.js";
import { TabaleProduct } from "../../components/TableProduct";
import { TableOrder } from "../../components/TableOrder/index.jsx";

import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { BtnAddOrder } from "./BtnAddProduct.jsx";
import { Button } from "../../components/Button/index.jsx";
import { Link } from "react-router-dom";

export const CreateOrderPage = () => {
  const [dataTableProduct, setDataTableProduct] = useState([]);
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
    const newDataTable = dataTableProduct.map((item) => {
      if (item.id === data.id) {
        item.active = false;
        item.stock = item.stock - 1;
      }
      return item;
    });
    setDataTableProduct(newDataTable);

    const value = { ...data, quantity: 1 };
    setOrder((prev) => ({ ...prev, products: [...prev.products, value] }));
  };

  const handleQuantity = (id, n) => {
    const newOrderProducts = order.products.map((item) => {
      if (item.id === id) item.quantity = item.quantity + n;
      return item;
    });
    setOrder((prev) => ({ ...prev, products: newOrderProducts }));

    const newDataTable = dataTableProduct.map((item) => {
      if (item.id === id) item.stock = item.stock + -n;
      return item;
    });
    setDataTableProduct(newDataTable);
  };

  const deleteProductOrder = (data) => {
    const newDataTable = dataTableProduct.map((item) => {
      if (item.id === data.id) {
        item.active = true;
        item.stock = item.stock + data.quantity;
      }
      return item;
    });
    setDataTableProduct(newDataTable);

    setOrder((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item.id !== data.id),
    }));
  };

  useEffect(() => {
    let newOrder = order.products.reduce(
      (acc, item) => {
        acc.value = acc.value + item.quantity * item.price;
        acc.quantity = acc.quantity + item.quantity;
        return acc;
      },
      { value: 0, quantity: 0 }
    );
    setOrder((prev) => ({ ...prev, ...newOrder }));
  }, [order.products]);

  const handleCreteOrder = () => {
    const { name, quantity, value, products } = order;
    if (!!name && !!quantity && !!value && !!products.length) {
      createOrder(order);
    }
  };

  useEffect(() => {
    getAllProduct().then((res) => {
      setDataTableProduct(() =>
        res.map((item) => ({
          ...item,
          active: true,
        }))
      );
    });
  }, []);

  if (dataTableProduct.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Você não tem produto cadastrado</p>
        <p>
          <Link to="/">Cadastre clicando aqui</Link>
        </p>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Cadastrar Pedido</h1>
      <FormOrder order={order} handleChange={handleOrder} />
      {!!order.products.length && (
        <>
          <h2>Produtos</h2>
          <TableOrder
            dataTable={order.products}
            handleQuantity={handleQuantity}
            actions={(data) => (
              <Trash onClick={() => deleteProductOrder(data)} />
            )}
          />
          <Button
            text="Cadastrar"
            type="success"
            sizeContainer={800}
            handleClick={handleCreteOrder}
          />
        </>
      )}
      {dataTableProduct.length > 0 && (
        <>
          <h2>Produtos</h2>
          <TabaleProduct
            dataTable={dataTableProduct}
            actions={(data) => (
              <BtnAddOrder data={data} handleAdd={handleAdd} />
            )}
          />
        </>
      )}
    </main>
  );
};
