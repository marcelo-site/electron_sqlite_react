import styles from "./Modal.module.css";

export const Modal = ({ code, handleClick }) => {
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.exit} onClick={() => handleClick(false)}>
          X
        </span>
        <div>
          <h3>Deseja deletar o item:</h3>
          <p>
            <span style={{ fontWeight: 400 }}>Código:</span> <span>{code}</span>
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => handleClick(true)}
            className="btn btn-success"
            data-id=""
          >
            Ok
          </button>
          <button onClick={() => handleClick(false)} className="btn btn-blue">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
