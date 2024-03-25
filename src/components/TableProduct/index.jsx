import { formatPrice } from "../../utils/formatprice";

export const TableProduct = ({ dataTable, actions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th className="w-104">Preço</th>
          <th className="w-104">Estoque</th>
          <th className="w-104">Ações</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.length > 0 &&
          dataTable.map((item) => {
            return (
              <tr key={item.id + "product"}>
                <td>{item.code} </td>
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
