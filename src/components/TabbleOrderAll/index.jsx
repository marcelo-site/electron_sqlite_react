import { formatPrice } from "../../utils/formatprice";
import styles from "./TableOrder.module.css";

export const TableOrderAll = ({ dataTable, handleQuantity, actions }) => {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th className={styles.size}>Dia</th>
          <th className={styles.size}>Valor</th>
          <th className={styles.size}>Quantidade</th>
          <th className={styles.size}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((item) => {
          const day = item.createdAt.split(" ")[0].split("-")[2];
          return (
            <tr key={item.id + "order"}>
              <td>{item.id} </td>
              <td>{item.name} </td>
              <td>{day} </td>
              <td>{formatPrice(item.value)}</td>
              <td>{item.quantity}</td>
              <td>{actions(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
