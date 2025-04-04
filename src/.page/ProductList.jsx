import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  VStack,
  Stack,
  useToast,
  Input,
  Select,
} from "@chakra-ui/react";
import { getProducts } from "../.services/order";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [sortOption, setSortOption] = useState(""); 
  const { addToCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

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

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuantityChange = (productId, value) => {
    const quantityValue = Math.max(0, parseInt(value, 10) || 0);
    setQuantity((prev) => ({
      ...prev,
      [productId]: quantityValue,
    }));
  };

  const handleAddToCart = (product) => {
    const selectedQuantity = quantity[product.id] || 0;

    if (!user) {
      toast({
        title: "Error",
        description: "Debes estar logueado para realizar una compra.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      navigate("/Login");
      return;
    }

    if (selectedQuantity < 1 || selectedQuantity > product.stock) {
      toast({
        title: "Error",
        description: `Por favor, elige una cantidad válida entre 1 y ${product.stock}.`,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    if (selectedQuantity === 0) {
      toast({
        title: "Cantidad inválida",
        description: "No puedes agregar 0 unidades al carrito.",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: selectedQuantity,
    });

    toast({
      title: "Producto agregado",
      description: `El producto ha sido agregado a tu carrito (${selectedQuantity} unidades).`,
      status: "success",
      isClosable: true,
      duration: 3000,
    });
  };

  if (loading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Hubo un error al cargar los productos.</Text>;

  return (
    <>
      <Header />
      <Box px={4} py={6} minHeight="calc(100vh - 150px)">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Productos
        </Text>

        {/* Filtro de orden */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Ordenar por:
          </Text>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            placeholder="Selecciona una opción"
          >
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="name_az">Nombre: A-Z</option>
            <option value="name_za">Nombre: Z-A</option>
          </Select>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {products.map((product) => (
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
                boxSize="200px"
                objectFit="cover"
              />
              <Text fontSize="xl" fontWeight="semibold">
                {product.name}
              </Text>
              <Text fontSize="lg" color="gray.600">
                {product.price ? `$${product.price}` : "Precio no disponible"}
              </Text>
              <Text textAlign="center">Stock: {product.stock}</Text>

              {/* Input para la cantidad */}
              <Stack direction="row" spacing={4} alignItems="center">
                <Input
                  type="number"
                  min={0} // Permitir 0 como valor mínimo
                  max={product.stock}
                  value={quantity[product.id] || 0}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  width="80px"
                  textAlign="center"
                />
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </Button>

                
              </Stack>
            </VStack>
          ))}
        </SimpleGrid>

        {showBackToTop && (
          <Button
            position="fixed"
            bottom="4"
            right="4"
            colorScheme="teal"
            onClick={scrollToTop}
            size="lg"
            borderRadius="full"
            boxShadow="lg"
          >
            ↑
          </Button>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default ProductList;
