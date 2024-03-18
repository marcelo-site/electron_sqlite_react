import styles from "./CreateOrder.module.css";

import { useEffect, useState } from "react";
import {
  getAllProductsOrder,
  getAllOrder,
  deleteOrder,
  editOrder,
  deleteProductOrder,
} from "../../controllers/order/renderer.js";

import { FormOrder } from "../../components/FormOrder";
import { TableOrder } from "../../components/TableOrder/index.jsx";
import { ReactComponent as Eye } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRigth } from "../../assets/icons/chevron-right.svg";
import { TableOrderAll } from "../../components/TabbleOrderAll/index.jsx";
import { Modal } from "../../components/Modal/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { editDatePeriod, editDataInit } from "./editPeriod.js";

export const OrdersPage = () => {
  const [period, setPeriod] = useState(() => editDatePeriod(new Date()));
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [orderEdit, setOrderEdit] = useState(editDataInit);
  const [editDataMap, setEditdataMap] = useState(editDataInit);
  const [deleteOrderData, setDeleteOrderData] = useState({});
  const [delProductData, setDeleteProduct] = useState({});

  const handleOrder = (e) => {
    setOrderEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditdataMap((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddView = async (data) => {
    const productOrders = await getAllProductsOrder(data);
    setOrderEdit({ ...data, products: productOrders });
    const stockAll = productOrders.map((item) => ({
      productId: item.id,
      stock: item.stock,
      quantity: item.quantity,
      edit: false,
    }));
    setEditdataMap((prev) => ({
      ...prev,
      id: data.id,
      products: stockAll,
    }));
  };

  const controlModalDelete = (data) => {
    setModalOpen(true);
    setDeleteOrderData(data);
  };

  const handleQuantity = (id, n) => {
    const newOrderProducts = orderEdit.products.map((item) => {
      if (item.id === id) item.quantity = item.quantity + n;

      return item;
    });

    const newEditProdcutData = editDataMap.products.map((item) => {
      if (item.productId === id) {
        item.stock = item.stock + -n;
        item.quantity = item.quantity + n;
        item.edit = true;
        return item;
      }
      return item;
    });

    setOrderEdit((prev) => ({ ...prev, products: newOrderProducts }));
    setEditdataMap((prev) => ({
      ...prev,
      products: newEditProdcutData,
    }));
  };

  const handleDeleteModal = (data) => {
    if (data) {
      deleteOrder(deleteOrderData).then((res) => {
        if (typeof res === "object") {
          setOrders((prev) =>
            prev.filter((item) => item.id !== deleteOrderData.id)
          );
        }
      });
    }
    setModalOpen(false);
  };

  const handleDeleteModal2 = (data) => {
    if (data) {
      deleteProductOrder({ ...delProductData, orderId: orderEdit.id }).then(
        (res) => {
          if (res?.count > 0) {
            setOrderEdit((prev) => ({
              ...prev,
              products: prev.products.filter((item) => item.id !== res.id),
            }));
          }
        }
      );
    }
    setModalOpen2(false);
  };

  const handleDelProductOrder = (data) => {
    setDeleteProduct(data);
    setModalOpen2(true);
  };

  const handlePeriod = (n) => {
    setOrderEdit(editDataInit);
    setPeriod(() => editDatePeriod(period.init, n));
  };

  useEffect(() => {
    let newOrder = orderEdit.products.reduce(
      (acc, item) => {
        acc.value = acc.value + item.quantity * item.price;
        acc.quantity = acc.quantity + item.quantity;
        return acc;
      },
      { value: 0, quantity: 0 }
    );
    setOrderEdit((prev) => ({ ...prev, ...newOrder }));
    setEditdataMap((prev) => ({ ...prev, ...newOrder }));
  }, [orderEdit.products]);

  useEffect(() => {
    getAllOrder(period).then((res) => setOrders(() => res));
  }, [period]);

  return (
    <main className={styles.container}>
      <h1>Pedidos</h1>
      {modalOpen && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal} />
      )}
      {modalOpen2 && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal2} />
      )}
      {!!orderEdit.products.length && (
        <>
          <h2>Pedido</h2>
          <FormOrder order={orderEdit} handleChange={handleOrder} edit={true} />
          <h2>Produtos do Pedido</h2>
          <TableOrder
            dataTable={orderEdit.products}
            handleQuantity={handleQuantity}
            actions={(data) => (
              <Trash onClick={() => handleDelProductOrder(data)} />
            )}
          />
          <Button
            text="Editar"
            type="dark"
            handleClick={() =>
              editOrder(editDataMap).then(() => window.location.reload(true))
            }
            sizeContainer={800}
          />
        </>
      )}
      <div className={styles.period}>
        <ChevronLeft onClick={() => handlePeriod(-1)} />
        <span>
          {period.month} {period.year}
        </span>
        <ChevronRigth onClick={() => handlePeriod(1)} />
      </div>
      {!!orders.length ? (
        <TableOrderAll
          dataTable={orders}
          handleQuantity={handleQuantity}
          actions={(item) => (
            <>
              {<Eye onClick={() => handleAddView(item)} />}
              {<Trash onClick={() => controlModalDelete(item)} />}
            </>
          )}
        />
      ) : (
        <div className="flex">Não há vendas para esse mês</div>
      )}
    </main>
  );
};
