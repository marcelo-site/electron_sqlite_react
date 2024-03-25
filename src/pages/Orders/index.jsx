import styles from "./CreateOrder.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { ReactComponent as Chevron } from "../../assets/icons/chevron-left.svg";
import { TableOrderAll } from "../../components/TabbleOrderAll/index.jsx";
import { Modal } from "../../components/Modal/index.jsx";
import { editDatePeriod, editDataInit } from "./editPeriod.js";
import { Button } from "../../components/Button/index.jsx";

export const OrdersPage = () => {
  const [period, setPeriod] = useState(() => editDatePeriod(new Date()));
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
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
      try {
        deleteOrder(deleteOrderData).then((res) => {
          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("Pedido deletado com sucesso!");
            setOrders((prev) =>
              prev.filter((item) => item.id !== deleteOrderData.id)
            );
          }
        });
      } catch (error) {
        toast.error("Algum erro aconteceu nessa operação!");
      }
    }
    setModalOpen(false);
  };

  const handleDeleteModal2 = (data) => {
    setModalDelete(false);
    if (data) {
      try {
        deleteProductOrder({ ...delProductData, orderId: orderEdit.id }).then(
          (res) => {
            if (res?.error) {
              toast.error(res.error);
            } else {
              toast.success("Produto deletado deste pedido com sucesso!");
              setOrderEdit((prev) => ({
                ...prev,
                products: prev.products.filter((item) => item.id !== res.id),
              }));
            }
          }
        );
      } catch (error) {
        toast.error("Algum erro aconteceu nessa operação!");
      }
    }
  };

  const handleDelProductOrder = (data) => {
    setDeleteProduct(data);
    setModalDelete(true);
  };

  const handlePeriod = (n) => {
    setOrderEdit(editDataInit);
    setPeriod(() => editDatePeriod(period.init, n));
  };

  const handleEdit = (edit) => {
    if (edit) {
      editOrder(editDataMap).then(() => window.location.reload(true));
    } else {
      setOrderEdit(editDataInit);
    }
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
    try {
      getAllOrder(period).then((res) => {
        if (!res) throw new Error("");
        setOrders(() => res);
      });
    } catch (error) {
      toast.error("Algum erro aconteceu na busca dos dados!");
    }
  }, [period]);

  return (
    <main className={styles.container}>
      {modalOpen && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal} />
      )}
      {modalDelete && (
        <Modal code={deleteOrderData.id} handleClick={handleDeleteModal2} />
      )}
      {!!orderEdit.products.length && (
        <>
          <FormOrder order={orderEdit} handleChange={handleOrder} edit={true} />
          <h2>Produtos do Pedido</h2>
          <TableOrder
            dataTable={orderEdit.products}
            handleQuantity={handleQuantity}
            actions={(data) => (
              <Trash onClick={() => handleDelProductOrder(data)} />
            )}
          />
          <div className="containerBtn">
            <Button
              handleClick={() => handleEdit(true)}
              text="Editar"
              type="dark"
            />
            <Button
              handleClick={() => handleEdit(false)}
              text="Cancelar"
              type="blue"
            />
          </div>
          <hr style={{ width: 960, margin: "16px auto" }} />
        </>
      )}
      <h1>Todos os Pedidos</h1>
      <div className={styles.period}>
        <Chevron onClick={() => handlePeriod(-1)} />
        <span>
          {period.month} {period.year}
        </span>
        <Chevron
          style={{ transform: "rotate(180deg)" }}
          onClick={() => handlePeriod(1)}
        />
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
