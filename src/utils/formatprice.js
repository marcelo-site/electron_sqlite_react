export const formatPrice = (n) => {
  return n.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
