export const formatDate = (data) => {
  const split = data.split(" ");
  const dateAt = new Date(`${split[0]}T${split[1]}${split[2]}`);
  return {
    year: dateAt.getFullYear(),
    month: dateAt.getMonth(),
    date: dateAt.getDate(),
    day: dateAt.getDay(),
  };
};
