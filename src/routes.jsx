import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { Home } from "./pages/Home";
import { CreateOrderPage } from "./pages/CreateOrder";
import { OrdersPage } from "./pages/Orders";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}
