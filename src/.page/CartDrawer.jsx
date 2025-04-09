import {
    Drawer,
    DrawerCloseButton,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    IconButton,
    Box,
    Text,
    Button,
    Stack,
    Image,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react";
  
  import { FaShoppingCart } from "react-icons/fa";
  import { useCart } from "../context/CartContext";
  import { useNavigate } from "react-router-dom";
  import { useRef } from "react";
  
  const CartDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      isOpen: isAlertOpen,
      onOpen: onAlertOpen,
      onClose: onAlertClose,
    } = useDisclosure();
  
    const cancelRef = useRef(null);
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();
  
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  
    const handleCheckout = () => {
      onAlertOpen(); // Mostrar el alert de confirmación
    };
  
    const handleCheckoutConfirm = () => {
      onAlertClose();
      onClose();
      navigate("/shopping");
    };
  
    return (
      <>
        <IconButton
          icon={<FaShoppingCart />}
          onClick={onOpen}
          variant="ghost"
          colorScheme="black"
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
                        <Text fontSize="sm" color="gray.600">
                          ${product.price} x {product.quantity}
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Subtotal: ${product.price * product.quantity}
                        </Text>
  
                        <NumberInput
                          size="sm"
                          maxW="100px"
                          mt={2}
                          value={product.quantity}
                          min={1}
                          max={product.stock}
                          onChange={(_, valueAsNumber) =>
                            updateQuantity(product.id, valueAsNumber)
                          }
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
  
                        <Button
                          size="xs"
                          mt={2}
                          colorScheme="black"
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
                Total: ${total}
              </Text>
              <Button
              colorScheme="#333333;"
                width="100%"
                isDisabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Finalizar compra
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
  
        {/* Alert Dialog */}
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirmar compra
              </AlertDialogHeader>
  
              <AlertDialogBody>
                ¿Estás seguro que deseas realizar la compra?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                  Cancelar
                </Button>
                <Button colorScheme="#333232;" onClick={handleCheckoutConfirm} ml={3}>
                  Aceptar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };
  
  export default CartDrawer;
  