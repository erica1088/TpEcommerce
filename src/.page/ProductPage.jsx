import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Stack,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createProducts } from "../.services/order";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToDelete, setProductToDelete] = useState(null);

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
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
      <IconButton
        icon={<FaShoppingCart />}
        onClick={onOpen}
        variant="ghost"
        colorScheme="#D5C792;"
        aria-label="Ver carrito"
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu Carrito</DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <Text>Tu carrito está vacío.</Text>
            ) : (
              cart.map((product) => (
                <Box
                  key={product.id}
                  borderBottom="1px solid #e2e8f0"
                  pb={4}
                  mb={4}
                >
                  <Stack direction="row" spacing={4}>
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box flex="1">
                      <Text fontWeight="semibold">{product.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        ${product.price} x {product.quantity}
                      </Text>
                      <Stack direction="row" mt={1}>
                        <Button
                          size="xs"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          isDisabled={product.quantity <= 1}
                        >
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button
                          size="xs"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                          isDisabled={product.quantity >= product.stock}
                        >
                          +
                        </Button>
                      </Stack>
                      <Button
                        size="xs"
                        mt={2}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))
            )}
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="start">
            <Text fontWeight="bold" mb={2}>
              Total: ${totalPrice}
            </Text>
            <Button
              colorScheme="teal"
              width="100%"
              isDisabled={cart.length === 0}
            >
              Finalizar compra
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartPage;
