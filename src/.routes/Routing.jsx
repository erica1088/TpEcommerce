import { Route, Routes } from "react-router-dom";
import { Register } from "../.page/Register.jsx";
import { Login } from "../.page/Login.jsx";
import { Create } from "../.page/Create.jsx";
import ProductPage from "../.page/ProductPage";
import ProductList from "../.page/ProductList";
import Home from "../.page/Home.jsx";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/productList" element={<ProductPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/CartPage" element={<ProductPage />} />
    </Routes>
  );
};

export default Routing;
