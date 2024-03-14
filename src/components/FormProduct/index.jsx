import styles from "./FormProduct.module.css";
import { Input } from "../Input/index.jsx";
import { useEffect, useState } from "react";
import { _uuid } from "../../utils/uuid.js";

export const FormProduct = ({ value, handleValue, onSubmit, edit }) => {
  const [product, setProduct] = useState(value ? value : {});

  const gerarId = () => {
    setProduct((prev) => ({
      ...prev,
      code: _uuid.generate(),
    }));
  };

  const handleChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => setProduct(value), [value]);

  return (
    <form onSubmit={() => onSubmit(product)} className={`form`}>
      <div className={styles.uuid}>
        <button onClick={gerarId} type="button">
          Gerar ID
        </button>
        <Input
          type={"text"}
          name={"code"}
          value={product?.code || ""}
          placeholder={"Código do Produto"}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <Input
        type={"text"}
        name={"name"}
        value={product?.name || ""}
        placeholder={"Nome"}
        handleChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <div className={`flex ${styles.flex}`}>
        <Input
          type={"number"}
          name={"price"}
          value={product?.price || ""}
          placeholder={"Preço"}
          handleChange={(e) => handleChange(e.target.name, +e.target.value)}
        />
        <Input
          type={"number"}
          name={"stock"}
          value={product?.stock || ""}
          placeholder={"Estoque"}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <div className={`flex ${styles.buttons}`}>
        <input
          className="btn btn-success"
          type="submit"
          value={edit ? "Editar" : "Cadastrar"}
        />
        <button onClick={handleValue} className="btn btn-blue" type="button">
          Cancelar
        </button>
      </div>
    </form>
  );
};
