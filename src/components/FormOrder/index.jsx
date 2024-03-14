import styles from "./FormOrder.module.css";
import { Input } from "../Input";

export const FormOrder = ({ handleChange, order }) => {
  const value = +order.value;
  return (
    <form className={`${styles.container} form`}>
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
          name="qunatity"
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
