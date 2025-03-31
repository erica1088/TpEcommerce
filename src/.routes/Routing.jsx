import { Route, Routes } from "react-router-dom"
import Register from "../.page/Register.jsx"
import Login from "../.page/Login.jsx";


const Routing = () =>{

    return(
        <Routes>
            <Route path="/Register"  element={<Register/>}/>
            <Route path="/Login"  element={<Login/>}/>
        </Routes>
    )
    
    
}

export default Routing;