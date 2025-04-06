import React, { useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  VStack,
  Image,
  Stack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToDelete, setProductToDelete] = useState(null);
  const totalPrice = cart.reduce(
    (acc, product) => acc + (product.price || 0),
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para completar tu compra.");
      return;
    }
    if (!cart.length) {
      alert("Tu carrito está vacío.");
      return;
    }
    for (const product of cart) {
      if (product.quantity > product.stock) {
        return;
      }
    }

    try {
      await createProducts(cart, user.uid);
      clearCart();
      navigate("/gracias");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un problema al procesar tu pedido.");
    }
  };

  const handleBackToHome = () => {
    navigate("/products");
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    onOpen();
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      removeFromCart(productToDelete);
      onClose();
    }
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
          <Box textAlign="center">
            <Text>No tienes productos en tu carrito.</Text>
            <Button mt={4} colorScheme="teal" onClick={handleBackToHome}>
              Volver a productos
            </Button>
          </Box>
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
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  color="gray.600"
                  textAlign="center"
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
                    onClick={() => handleDeleteProduct(product.id)}
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
            alignItems={{ base: "stretch", md: "center" }}
            gap={4}
          >
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              width={{ base: "100%", md: "auto" }}
            >
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={handleBackToHome}
              >
                Seguir comprando
              </Button>
              <Button
                colorScheme="teal"
                onClick={handleCheckout}
                width={{ base: "100%", md: "auto" }}
              >
                Iniciar Compra
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar eliminación
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este producto de tu carrito?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Footer />
    </>
  );
};

export default CartPage;
