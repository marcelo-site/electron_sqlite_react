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
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { TableOrderAll } from "../../components/TabbleOrderAll/index.jsx";
import { Modal } from "../../components/Modal/index.jsx";

let editDataInit = {
  id: "",
  name: "",
  value: 0,
  quantity: 0,
  products: [],
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [order, setOrder] = useState(editDataInit);
  const [editDataMap, setEditdataMap] = useState(editDataInit);
  const [deleteOrderData, setDeleteOrderData] = useState({});
  const [delProductData, setDeleteProduct] = useState({});

  const handleOrder = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditdataMap((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddView = async (data) => {
    const productOrders = await getAllProductsOrder(data);
    setOrder({ ...data, products: productOrders });
    const stockAll = productOrders.map((item) => ({
      productId: item.id,
      stock: item.stock,
      quantity: item.quantity,
      edit: false,
    }));
    setEditdataMap((prev) => ({ ...prev, id: data.id, products: stockAll }));
  };

  const controlModalDelete = (data) => {
    setModalOpen(true);
    setDeleteOrderData(data);
  };

  const handleQuantity = (id, n) => {
    const newOrderProducts = order.products.map((item) => {
      if (item.id === id) {
        item.quantity = item.quantity + n;
      }
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

    setOrder((prev) => ({ ...prev, products: newOrderProducts }));
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
      deleteProductOrder({ ...delProductData, orderId: order.id }).then(
        (res) => {
          console.log(res);
          if (res?.count > 0) {
            setOrder((prev) => ({
              ...prev,
              products: prev.products.filter((item) => item.id !== res.id),
            }));
          }
        }
      );
    }
    setModalOpen2(false);
  };

  const actions = (item) => (
    <>
      {<Pencil onClick={() => handleAddView(item)} />}
      {<Trash onClick={() => controlModalDelete(item)} />}
    </>
  );

  const handleDelProductOrder = (data) => {
    setDeleteProduct(data);
    setModalOpen2(true);
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
    setEditdataMap((prev) => {
      return {
        ...prev,
        ...newOrder,
      };
    });
  }, [order.products]);

  useEffect(() => {
    getAllOrder().then((res) => setOrders(() => res));
  }, []);

  console.log("sdel", delProductData);

  return (
    <div className={styles.container}>
      {modalOpen && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal} />
      )}
      {modalOpen2 && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal2} />
      )}
      {!!order.products.length && (
        <>
          <h2>Pedido</h2>
          <FormOrder order={order} handleChange={handleOrder} />
          <TableOrder
            dataTable={order.products}
            handleQuantity={handleQuantity}
            actions={(data) => (
              <Trash onClick={() => handleDelProductOrder(data)} />
            )}
          />
          <div>
            <button
              className="btn btn-success"
              onClick={() => editOrder(editDataMap)}
            >
              Editar
            </button>
          </div>
        </>
      )}
      {!!orders.length && (
        <TableOrderAll
          dataTable={orders}
          handleQuantity={handleQuantity}
          actions={actions}
        />
      )}
    </div>
  );
};
