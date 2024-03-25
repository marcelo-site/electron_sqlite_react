import styles from "./CreateOrder.module.css";
import { useEffect, useState } from "react";

import { getAllProduct } from "../../controllers/product/renderer.js";
import { handleCreteOrder, orderInit } from "./handleCreateOrder.js";

import { TableProduct } from "../../components/TableProduct";
import { TableOrder } from "../../components/TableOrder/index.jsx";
import { FormOrder } from "../../components/FormOrder";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { BtnAddOrder } from "./BtnAddProduct.jsx";
import { Button } from "../../components/Button/index.jsx";
import { ProductEmpty } from "./ProductEmpty.jsx";

export const CreateOrderPage = () => {
  const [dataTableProduct, setDataTableProduct] = useState([]);
  const [order, setOrder] = useState(orderInit);

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
    return <ProductEmpty />;
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
          <div className="containerBtn">
            <Button
              text="Cadastrar"
              type="dark"
              sizeContainer={960}
              handleClick={() => handleCreteOrder(order)}
            />
          </div>
        </>
      )}
      {dataTableProduct.length > 0 && (
        <>
          <h2>Produtos</h2>
          <TableProduct
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
