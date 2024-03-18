import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.css";

const App = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
