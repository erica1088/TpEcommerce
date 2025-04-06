import {
  HStack,
  useBreakpointValue,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Flex,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const NavLinks = ({ onClick }) => (
  <>
    <NavLink to="/" onClick={onClick}>
      Home
    </NavLink>
    <NavLink to="/products" onClick={onClick}>
      Productos
    </NavLink>
    <NavLink to="/register" onClick={onClick}>
      Registrarme
    </NavLink>
    <NavLink to="/login" onClick={onClick}>
      Iniciar sesión
    </NavLink>
  </>
);

const Header = () => {
  const { isOpen, onOpen, onClose, totalItems } = useDisclosure();
  const Mobile = useBreakpointValue({ base: true, md: true, lg: false });
  const { logout, user } = useAuth();
  return (
    <Box>
      <HStack wrap="wrap">
        <HStack
          justify="space-between"
          align="center"
          maxW="1200px"
          mx="auto"
          position="center"
        >
          {/* Logo y nombre de la tienda */}
          <HStack spacing={2}>
            <Image
              src="/logoH.jpg"
              alt="Logo"
              boxSize={{ base: "80px", md: "40px", lg: "120px" }}
              borderRadius="45px"
              objectFit="contain"
            />
          </HStack>

          {Mobile ? (
            <Flex width="100%" align="center" justify="space-between">
              {/* Menú hamburguesa a la izquierda */}
              <IconButton
                aria-label="Abrir menú"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="outline"
              />

              {/* Carrito a la derecha */}
              {user && (
                <RouterLink to="/carrito">
                  <Button variant="ghost" fontSize="2xl" position="relative">
                    <FaShoppingCart size="24px" />
                    {totalItems > 0 && (
                      <Box
                        position="absolute"
                        top="-5px"
                        right="-5px"
                        color="white"
                        fontSize="xs"
                        background="red.500"
                        borderRadius="full"
                        width="16px"
                        height="16px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {totalItems}
                      </Box>
                    )}
                  </Button>
                </RouterLink>
              )}
            </Flex>
          ) : (
            <HStack spacing={6}>
              <NavLinks />
              <Button colorScheme="#D5C792;" onClick={logout}>
                Cerrar sesión
              </Button>
              <RouterLink to="/carrito">
                <Button variant="ghost" fontSize="2xl" position="relative">
                  <FaShoppingCart size="24px" />
                  {user ? (
                    totalItems > 0 ? (
                      <Box
                        position="absolute"
                        top="-5px"
                        right="-5px"
                        color="white"
                        fontSize="xs"
                        background="red.500"
                        borderRadius="full"
                        width="16px"
                        height="16px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {totalItems}
                      </Box>
                    ) : (
                      <Text fontSize="sm" color="gray.500"></Text>
                    )
                  ) : (
                    <Text fontSize="sm" color="gray.500"></Text>
                  )}
                </Button>
              </RouterLink>
            </HStack>
          )}
        </HStack>

        <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="#b39c97" fontFamily="'Playfair Display', serif">
            <DrawerCloseButton />
            <DrawerHeader>Menú</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={4}>
                <NavLinks onClick={onClose} />
                <NavLink to="/carrito" onClick={onClose}>
                  Carrito
                </NavLink>
                <NavLink as={Button} onClick={logout}>
                  <Text color="black" fontWeight="bold">
                    Cerrar sesión
                  </Text>
                </NavLink>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </Box>
  );
};

export default Header;
