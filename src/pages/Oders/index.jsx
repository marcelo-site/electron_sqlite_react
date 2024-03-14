import { useEffect, useState } from "react";
import { getAllOrder } from "../../controllers/order/renderer.js";
import { TableOrderAll } from "../../components/TabbleOrderAll/index.jsx";

import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { TableOrder } from "../../components/TableOrder/index.jsx";
import { Modal } from "../../components/Modal/index.jsx";

export const OdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getAllOrder().then((res) => {
      setOrders(res);
    });
  }, []);

  const handleDelete = (data) => {
    if (data) {
      // deleteProduct(deleteData).then((res) => {
      //   if (typeof res === "object") {
      //     setDataTable((prev) => prev.filter((item) => item.id !== res.id));
      //   }
      // });
    }
    modalOpen(false);
  };

  const actionOrder = (data) => <Trash onClick={() => console.log(data)} />;

  const handleEdit = () => console.log(11);

  const handleQuantity = (data, id) => console.log(1);

  const actions = (item) => {
    return (
      <>
        {<Pencil onClick={() => handleEdit(item)} />}
        {<Trash onClick={() => handleDelete(item)} />}
      </>
    );
  };

  return (
    <>
      {!!orderProducts.length && (
        <>
          <h2>Pedido</h2>
          <TableOrder
            dataTable={orderProducts}
            handleQuantity={handleQuantity}
            actions={actionOrder}
          />
        </>
      )}
      {!!orders.length && (
        <TableOrderAll
          dataTable={orders}
          handleQuantity={handleQuantity}
          actions={actions}
        />
      )}
    </>
  );
};
