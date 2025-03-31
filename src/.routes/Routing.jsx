import { Route, Routes } from "react-router-dom"
import Register from "../.page/Register"


const Routing = () =>{

    return(
        <Routes>
            <Route path="/register"  element={Register}/>
        </Routes>
    )
    
    
}

export default Routing