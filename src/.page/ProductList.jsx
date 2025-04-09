import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  VStack,
  Stack,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { getProducts } from "../.services/order";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaArrowUp } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && sortOption) {
      const sortedProducts = [...products];
      switch (sortOption) {
        case "price_asc":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "name_az":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_za":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      setProducts(sortedProducts);
    }
  }, [sortOption, products.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para realizar una compra.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      navigate("/home");
      return;
    }

    if (product.stock < 1) {
      toast({
        title: "Producto sin stock",
        description: "Este producto no tiene unidades disponibles.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    addToCart(product);
    toast({
      title: "Producto agregado",
      description: `Se agregó 1 unidad al carrito.`,
      status: "success",
      isClosable: true,
      duration: 3000,
    });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Hubo un error al cargar los productos.</Text>;

  return (
    <>
      <Header />
      <Box
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 6, md: 12 }}
        minHeight="calc(100vh - 150px)"
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={6}>
          Productos
        </Text>

        <Box mb={6}>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            mb={2}
          >
            Ordenar por:
          </Text>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            placeholder="Selecciona una opción"
            size={{ base: "sm", md: "md" }}
          >
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="name_az">Nombre: A-Z</option>
            <option value="name_za">Nombre: Z-A</option>
          </Select>
        </Box>

        {/* Responsive Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 4, md: 6 }}
        >
          {products.map((product) => (
            <VStack
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              spacing={4}
              boxShadow="sm"
              alignItems="center"
            >
              <Image
                src={product.image_url}
                alt={product.name}
                borderRadius="md"
                boxSize={{ base: "150px", sm: "200px", md: "250px" }}
                objectFit="cover"
              />
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                fontWeight="semibold"
                isTruncated
                textAlign="center"
                fontFamily="'Playfair Display', serif"
              >
                {product.name}
              </Text>
              <Text
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
                color="gray.600"
                textAlign="center"
              >
                {product.price ? `$${product.price}` : "Precio no disponible"}
              </Text>

              {/* Input para la cantidad */}
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 2, sm: 3 }}
                alignItems="center"
              >
                <Button
                  colorScheme="#333333;"
                  variant="solid"
                  onClick={() => handleAddToCart(product)}
                  size={{ base: "sm", sm: "sm" }}
                  width={{ base: "100%", sm: "auto" }}
                  px={3}
                  py={2}
                  fontSize="sm"
                  _hover={{ bg: "gray.200" }}
                >
                  Comprar
                </Button>

                <Button
                  colorScheme="#a88e88;"
                  onClick={() => handleViewDetails(product)}
                  size={{ base: "sm", sm: "sm" }}
                  px={3}
                  py={2}
                  fontSize="sm"
                >
                  Ver Detalle
                </Button>
              </Stack>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal para ver los detalles del producto */}
      {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedProduct.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                boxSize="300px"
                objectFit="cover"
                mb={4}
              />
              <Text fontSize="lg" fontWeight="bold">
                Precio: ${selectedProduct.price}
              </Text>
              <Text mt={2}>{selectedProduct.description}</Text>
              <Text mt={2}>Stock disponible: {selectedProduct.stock}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {showBackToTop && (
        <IconButton
          position="fixed"
          bottom={{ base: 6, md: 8 }}
          right={{ base: 6, md: 8 }}
          colorScheme="#494c4f;"
          aria-label="Back to top"
          icon={<FaArrowUp />}
          size="lg"
          onClick={scrollToTop}
        />
      )}

      <Footer />
    </>
  );
};

export default ProductList;
