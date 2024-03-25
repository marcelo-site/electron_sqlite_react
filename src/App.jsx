import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <HashRouter>
      <ToastContainer autoClose={3000} />
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
