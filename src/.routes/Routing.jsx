import { Route, Routes } from "react-router-dom";
import { Register } from "../.page/Register.jsx";
import { Login } from "../.page/Login.jsx";
import { Create } from "../.page/Create.jsx";

import Home from "../.page/Home.jsx";







const Routing = () => {
  return (


    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Create" element={<Create />} />

   
      

    </Routes>
   
  );
};

export default Routing;
