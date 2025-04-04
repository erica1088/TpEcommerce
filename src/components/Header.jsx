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
import {  NavLink, Link as RouterLink } from "react-router-dom";
import { HamburgerIcon} from "@chakra-ui/icons";
import React from "react";

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
  const { logout } = useAuth();

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
            <Text
              fontSize={{ base: "20px", md: "30px", lg: "46px" }}
              fontWeight="bold"
              fontFamily="'Playfair Display', serif"
            >
              Home wood
            </Text>
          </HStack>

          {Mobile ? (
            <IconButton
              aria-label="Abrir menú"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="outline"
            />
          ) : (
            <HStack spacing={6}>
              <NavLinks />
              <Button colorScheme="red" onClick={logout}>
                Cerrar sesión
              </Button>
              <RouterLink to="/carrito">
                <Button variant="ghost" fontSize="2xl">
                  <Image src="public/carrito.png" width="35px" height="35px" />
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
