import { formatPrice } from "../../utils/formatprice";
import styles from "./TableOrder.module.css";

export const TableOrder = ({ dataTable, handleQuantity, actions }) => {
  console.log("dataOrder", dataTable);
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th className={styles.size}>Quantidade</th>
          <th className={styles.size}>Valor</th>
          <th className={styles.size}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((item) => {
          return (
            <tr key={item.id + "order"}>
              <td>{item.id} </td>
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
