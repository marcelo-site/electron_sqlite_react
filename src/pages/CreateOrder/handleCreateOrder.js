import { toast } from "react-toastify";
import { createOrder } from "../../controllers/order/renderer.js";

export const handleCreteOrder = (data) => {
  if (data.name === "") {
    toast.warn("Falta nome do cliente!");
    return;
  }
  if (Number(data.quantity) === 0) {
    toast.warn("Falta quantidade de produtos!");
    return;
  }
  if (Number(data.value) === 0) {
    toast.warn("Falta o valor do pedido!");
    return;
  }
  if (data.products.length === 0) {
    toast.warn("Falta produtos para o pedido!");
    return;
  }

  createOrder(data).then((res) => {
    if (res?.error) toast.error("Erro ao criar pedido!");
    else toast.success("Pedido criado com sucesso!");
  });
};

export const orderInit = {
  name: "",
  quantity: 0,
  value: 0,
  products: [],
};
