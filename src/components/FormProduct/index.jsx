import styles from "./FormProduct.module.css";
import { Input } from "../Input/index.jsx";
import { useEffect, useState } from "react";
import { _uuid } from "../../utils/uuid.js";
import { ReactComponent as Generate } from "../../assets/icons/arrow-repeat.svg";
import { Button } from "../Button/index.jsx";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(product);
      }}
      className="form"
    >
      <div className={styles.uuid}>
        <button className="flex" onClick={gerarId} type="button">
          <Generate />
          Gerar
        </button>
        <Input
          type="text"
          name="code"
          value={product?.code || ""}
          placeholder={"Código do Produto"}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <Input
        type="text"
        name="name"
        value={product?.name || ""}
        placeholder="Nome do produto"
        handleChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <div className={`flex ${styles.flex}`}>
        <Input
          type="number"
          name="price"
          value={product?.price || ""}
          placeholder="Preço"
          handleChange={(e) => handleChange(e.target.name, +e.target.value)}
        />
        <Input
          type="number"
          name="stock"
          value={product?.stock || ""}
          placeholder="Estoque"
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <div className="containerBtn">
        <input
          className="btn btn-dark"
          type="submit"
          value={edit ? "Editar" : "Cadastrar"}
        />
        {edit && (
          <Button handleClick={handleValue} text={"Cancelar"} type={"blue"} />
        )}
      </div>
    </form>
  );
};
