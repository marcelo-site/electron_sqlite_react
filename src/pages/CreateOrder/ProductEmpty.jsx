import { Link } from "react-router-dom";
import styles from "./CreateOrder.module.css";

export const ProductEmpty = ({ style }) => {
  return (
    <main className={styles.empty}>
      <p>Você não tem produto cadastrado</p>
      <p>
        <Link to="/">Cadastre produtos aqui</Link>
      </p>
    </main>
  );
};
