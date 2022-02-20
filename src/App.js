import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import "./stylesheets/layout.css";
import "./stylesheets/product.css";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/orders" exact element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
