import React from "react";
import { Box, Button, Text, VStack, Stack, IconButton } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  // Si no hay productos en el carrito, mostrar mensaje
  if (cartItems.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="2xl">Tu carrito está vacío.</Text>
      </Box>
    );
  }

  return (
    <Box px={4} py={6}>
      <VStack spacing={4} align="start">
        <Text fontSize="3xl" fontWeight="bold">
          Carrito de Compras
        </Text>
        {/* Lista de productos en el carrito */}
        {cartItems.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <VStack align="start" spacing={1}>
              <Text fontSize="xl" fontWeight="semibold">
                {item.name}
              </Text>
              <Text fontSize="lg" color="gray.600">
                ${item.price} x {item.quantity}
              </Text>
            </VStack>

            <Stack direction="row" spacing={4}>
              {/* Eliminar producto */}
              <IconButton
                icon={<FaTrashAlt />}
                colorScheme="red"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar producto"
              />

              {/* Botón para aumentar/disminuir cantidad */}
              <Button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                isDisabled={item.quantity === 1}
              >
                -
              </Button>
              <Text>{item.quantity}</Text>
              <Button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </Stack>
          </Box>
        ))}

        {/* Total */}
        <Box mt={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Total: ${getTotal()}
          </Text>
        </Box>

        {/* Botón para proceder al pago */}
        <Button colorScheme="teal" mt={4}>
          Proceder al Pago
        </Button>
      </VStack>
    </Box>
  );
};

export default Cart;
