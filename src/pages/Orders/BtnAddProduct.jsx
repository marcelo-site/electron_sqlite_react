export const BtnAddOrder = ({ data, handleAdd }) => (
  <button
    onClick={() => handleAdd(data)}
    style={{ display: "inline-flex" }}
    className={`btn btn-success ${data.active ? "" : "events-none"}`}
    type="button"
  >
    Adicionar
  </button>
);
