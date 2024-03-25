export const BtnAddOrder = ({ data, handleAdd }) => (
  <button
    onClick={() => handleAdd(data)}
    style={{ display: "inline-flex", padding: "0px 6px", fontSize: 20 }}
    className={`btn btn-dark ${data.active ? "" : "events-none"}`}
    type="button"
  >
    +
  </button>
);
