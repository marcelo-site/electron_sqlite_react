export const BtnAddOrder = ({ data, handleAdd }) => (
  <button
    onClick={() => handleAdd(data)}
    style={{ display: "inline-flex" }}
    className={`btn btn-dark ${data.active ? "" : "events-none"}`}
    type="button"
  >
    Adicionar
  </button>
);
