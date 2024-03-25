import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatprice";
import styles from "./TableOrder.module.css";

export const TableOrderAll = ({ dataTable, handleQuantity, actions }) => {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th className="w-104">Data</th>
          <th className="w-104">Valor</th>
          <th className="w-104">Quantidade</th>
          <th className="w-104">Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((item) => {
          const { date } = formatDate(item.createdAt);
          return (
            <tr key={item.id + "order"}>
              <td>{item.id} </td>
              <td>{item.name} </td>
              <td>{date} </td>
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
