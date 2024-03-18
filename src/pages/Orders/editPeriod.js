import { months } from "../../utils/months.js";

export const editDatePeriod = (date, n) => {
  const dateAt = new Date(date);
  const init = new Date(dateAt.getFullYear(), dateAt.getMonth() + (n || 0), 1);
  const end = new Date(init.getFullYear(), init.getMonth() + 1, 1);
  return {
    init,
    end,
    month: months[init.getMonth()],
    year: init.getFullYear(),
  };
};

export let editDataInit = {
  id: "",
  name: "",
  value: 0,
  quantity: 0,
  products: [],
};
