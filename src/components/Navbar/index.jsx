import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Vendas</Link>
          </li>
          <li>
            <Link to="/create-order">Criar Vendas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
