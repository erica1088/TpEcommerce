import React from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  VStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, product) => acc + (product.price || 0),
    0
  );

  const handleCheckout = () => {
    if (!cart.length) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <Box
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 12 }}
        minHeight="calc(100vh - 150px)"
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={6}>
          Carrito de Compras
        </Text>

        {cart.length === 0 ? (
          <Text>No tienes productos en tu carrito.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {cart.map((product) => (
              <VStack
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                spacing={4}
                boxShadow="sm"
              >
                <Image
                  src={product.image_url}
                  alt={product.name}
                  borderRadius="md"
                  boxSize={{ base: "150px", md: "200px" }}
                  objectFit="cover"
                />
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold">
                  {product.name}
                </Text>
                <Text
                  ffontSize={{ base: "lg", md: "xl" }}
                  fontWeight="semibold"
                  color="gray.600"
                >
                  {product.price ? `$${product.price}` : "Precio no disponible"}
                </Text>
                <Text textAlign="center" fontSize={{ base: "sm", md: "md" }}>
                  Stock: {product.stock}
                </Text>

                <Stack direction="row" spacing={4}>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    onClick={() => removeFromCart(product.id)} // Eliminar producto del carrito
                  >
                    Eliminar
                  </Button>
                </Stack>
              </VStack>
            ))}
          </SimpleGrid>
        )}

        {cart.length > 0 && (
          <Box
            mt={6}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <Button colorScheme="teal" onClick={handleCheckout}>
              Proceder a la compra
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default CartPage;
