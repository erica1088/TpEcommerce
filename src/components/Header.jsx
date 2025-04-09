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
import CartDrawer from "../.page/CartDrawer";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Mobile = useBreakpointValue({ base: true, md: true, lg: false });
  const { logout, user } = useAuth();

  return (
    <Box bg="white" boxShadow="md" py={2}>
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        fontFamily="'roboto', sans-serif"
      >
        {/* Logo */}
        <HStack spacing={4}>
          <Image
            src="/logoH.jpg"
            alt="Logo"
            boxSize={{ base: "60px", md: "80px" }}
            borderRadius="full"
            objectFit="contain"
          />
        </HStack>

        {/* Navegación y acciones */}
        {Mobile ? (
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Abrir menú"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="outline"
            />
            <CartDrawer />
          </Flex>
        ) : (
          <HStack spacing={6} align="center">
            <NavLinks />
            {user && (
              <Button onClick={logout} colorScheme="#a88e88;" size="sm">
                Cerrar sesión
              </Button>
            )}
            <CartDrawer />
          </HStack>
        )}
      </Flex>

      {/* Drawer del menú hamburguesa */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#d3d1d1">
          <DrawerCloseButton />
          <DrawerHeader>Menú</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4}>
              <NavLinks onClick={onClose} />
              {user && <Text onClick={logout}>Cerrar sesión</Text>}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
