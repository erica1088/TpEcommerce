import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Register } from "../.page/Register.jsx";
import { Login } from "../.page/Login.jsx";
import { Create } from "../.page/Create.jsx";
import ProductPage from "../.page/ProductPage";
import ProductList from "../.page/ProductList";
import Home from "../.page/Home.jsx";
import CartPage from "../.page/ProductPage.jsx"; 
import NotFound from "../.page/NotFound.jsx";
import ProtectRoute from "../.routes/Protect.jsx"; 
import AppLayout from "../components/AppLayout.jsx";
import PageShopping from "../.page/PageShopping.jsx";


const Routing = () => {
  return (
 
      <Routes>   
    <Route element={<AppLayout />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productList" element={<ProductPage />} />
        <Route path="/shopping" element={<PageShopping />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectRoute />}>
        

          <Route path="/create" element={<Create />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/carrito" element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
  
  );
};

export default Routing;
