import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/orders" end>
              Vendas
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-order" end>
              Cadastrar
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
