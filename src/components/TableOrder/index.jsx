import { formatPrice } from "../../utils/formatprice";
import styles from "./TableOrder.module.css";

export const TableOrder = ({ dataTable, handleQuantity, actions }) => {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th className="w-104">Preço</th>
          <th className="w-104">Quantidade</th>
          <th className="w-104">Valor</th>
          <th className="w-104">Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((item) => {
          return (
            <tr key={item.id + "order"}>
              <td>{item.code} </td>
              <td>{item.name} </td>
              <td>{formatPrice(item.price)}</td>
              <td className={styles.quantity}>
                <span
                  onClick={() => {
                    const qty = +item.quantity - 1;
                    if (qty > 0) handleQuantity(item.id, -1);
                  }}
                  className={styles.control}
                >
                  -
                </span>
                <span>{item.quantity}</span>
                <span
                  className={styles.control}
                  onClick={() => {
                    const qty = +item.quantity + 1;
                    if (qty < item.stock + 2) handleQuantity(item.id, +1);
                  }}
                >
                  +
                </span>
              </td>
              <td>{formatPrice(item.quantity * item.price)} </td>
              <td>{actions(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
