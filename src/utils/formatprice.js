export const formatPrice = (n) => {
  return n.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
