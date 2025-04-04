

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Box,
  Text,
  VStack,

} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const CartShopping= ({ cartItems, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" leftIcon={<AddIcon />} position="fixed" bottom="20px" right="20px">
        Ver Carrito
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito de Compras</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {cartItems.length === 0 ? (
                <Text>No hay productos en el carrito.</Text>
              ) : (
                cartItems.map((item, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>Cantidad: {item.quantity}</Text>
                    <Text>Precio: ${item.price}</Text>
                    <Button
                      onClick={() => onIncreaseQuantity(index)}
                      colorScheme="blue"
                      size="sm"
                      mr={2}
                      leftIcon={<AddIcon />}
                    >
                      Aumentar
                    </Button>
                    <Button
                      onClick={() => onDecreaseQuantity(index)}
                      colorScheme="red"
                      size="sm"
                      mr={2}
                      leftIcon={<MinusIcon />}
                    >
                      Disminuir
                    </Button>
                    <Button
                      onClick={() => onRemoveItem(index)}
                      colorScheme="red"
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </Box>
                ))
              )}
            </VStack>
            {cartItems.length > 0 && (
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                </Text>
                <Button colorScheme="green" mt={4} width="100%">
                  Proceder al Pago
                </Button>

                <Link to="/cart">
        <Button colorScheme="teal">Ir al carrito</Button>
      </Link>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartShopping;
