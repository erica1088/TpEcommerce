import React from "react";
import { Box, Button, Text, VStack, Stack, IconButton } from "@chakra-ui/react";
import { useCart } from "../context/CartContext"; 
import { FaTrashAlt } from "react-icons/fa"; 
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount, clearCart } = useCart();
  const { user } = useAuth(); 
  
  if (!user) {
    return (
      <Box px={4} py={6}>
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Carrito de compras
        </Text>
        <Text>No estás logueado. Por favor, inicia sesión para ver tu carrito.</Text>
      </Box>
    );
  }

  return (
    <Box px={4} py={6}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Carrito de compras
      </Text>

      
      {cart.length === 0 ? (
        <Text>No hay productos en el carrito.</Text>
      ) : (
        <VStack spacing={4}>
          {cart.map((product) => (
            <Box
              key={product.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              width="full"
            >
              <Stack direction="row" spacing={4} align="center">
                {/* Product Image */}
                <Box flexShrink={0}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    width="80px"
                    height="80px"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </Box>

                {/* Product Details */}
                <VStack align="flex-start" spacing={1} flex="1">
                  <Text fontSize="xl" fontWeight="semibold">
                    {product.name}
                  </Text>
                  <Text color="gray.600">${product.price}</Text>
                  <Text>Cantidad: {product.quantity}</Text>
                </VStack>

                <Stack direction="row" spacing={4} align="center">
                  <Button size="sm" onClick={() => increaseQuantity(product.id)}>
                    Aumentar
                  </Button>
                  <Button size="sm" onClick={() => decreaseQuantity(product.id)}>
                    Disminuir
                  </Button>
                  <IconButton
                    size="sm"
                    icon={<FaTrashAlt />}
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Eliminar del carrito"
                    colorScheme="red"
                  />
                </Stack>
              </Stack>
            </Box>
          ))}
        </VStack>
      )}


      {cart.length > 0 && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Total: ${totalAmount.toFixed(2)}
          </Text>
          <Button colorScheme="green" mt={4} width="100%">
            Proceder al Pago
          </Button>
          <Button colorScheme="red" mt={4} width="100%" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
