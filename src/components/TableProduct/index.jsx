import { formatPrice } from "../../utils/formatprice";

export const TabaleProduct = ({ dataTable, actions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th style={{ width: "120px" }}>Preço</th>
          <th style={{ width: "120px" }}>Estoque</th>
          <th style={{ width: "120px" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.length > 0 &&
          dataTable.map((item) => {
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
