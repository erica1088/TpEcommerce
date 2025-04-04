import Routing from "./.routes/Routing.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Routing />
    </CartProvider>
  );
}

export default App;
