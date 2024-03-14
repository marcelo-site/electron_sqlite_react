import { formatPrice } from "../../utils/formatprice";
import styles from "./TableProduct.module.css";

export const TabaleProduct = ({ dataTable, actions }) => {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th style={{ width: "120px" }}>Estoque</th>
          <th style={{ width: "120px" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((item) => {
          return (
            <tr key={item.id + "product"}>
              <td>{item.id} </td>
              <td>{item.name} </td>
              <td>{formatPrice(item.price)} </td>
              <td>{item.stock} </td>
              <td>{actions(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
