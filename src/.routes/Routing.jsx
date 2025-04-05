import { Route, Routes } from "react-router-dom";
import { Register } from "../.page/Register.jsx";
import { Login } from "../.page/Login.jsx";
import { Create } from "../.page/Create.jsx";
import ProductPage from "../.page/ProductPage";
import ProductList from "../.page/ProductList";
import Home from "../.page/Home.jsx";
import CartPage from "../.page/ProductPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route path="/productList" element={<ProductPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<ProductPage />} />
      <Route path="/carrito" element={<CartPage />} />
    </Routes>
  );
};

export default Routing;