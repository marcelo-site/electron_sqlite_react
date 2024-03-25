import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

const { shell } = window.require("electron");

export const MainPage = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <footer>
        Software sob a licença
        <button
          onClick={() =>
            shell.openExternal(
              "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.pt"
            )
          }
          class="creative-commons"
        >
          CC BY-NC-SA
        </button>
      </footer>
    </div>
  );
};
