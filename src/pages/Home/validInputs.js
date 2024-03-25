import { toast } from "react-toastify";

export const validInputs = (data) => {
  if (!data) {
    toast.error("Dados inválidos!");
    return false;
  }

  const { code, name, price, stock } = data;
  if (code === "") {
    toast.warn("Falta um código para o produto!");
    return false;
  }
  if (name === "") {
    toast.warn("Falta um nome para o produto!");
    return false;
  }
  if (price === "") {
    toast.warn("Falta um preço para o produto!");
    return false;
  }
  if (stock === "") {
    toast.warn("Falta um estoque para o produto!");
    return false;
  }

  return true;
};

export const valueProductInit = {
  code: "",
  name: "",
  price: "",
  stock: "",
};
