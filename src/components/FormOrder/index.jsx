import styles from "./FormOrder.module.css";
import { Input } from "../Input";

export const FormOrder = ({ handleChange, order, edit }) => {
  const value = +order.value;
  return (
    <form className={`${styles.container} form`}>
      {edit && (
        <Input
          name={"id"}
          readOnly={true}
          placeholder={"Id"}
          type="text"
          value={order.id}
        />
      )}
      <Input
        handleChange={handleChange}
        name={"name"}
        placeholder={"Nome do Cliente"}
        type="text"
        value={order.name}
      />
      <div className="flex">
        <Input
          handleChange={handleChange}
          name="quantity"
          placeholder="Quantidade"
          type="number"
          value={order.quantity}
        />
        <Input
          handleChange={handleChange}
          name="value"
          placeholder="Valor do pedido"
          type="number"
          value={value.toFixed(2)}
        />
      </div>
    </form>
  );
};
