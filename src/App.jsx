import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Routing from "./.routes/Routing";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routing />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;