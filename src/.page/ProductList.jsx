import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text, Image, Button, VStack, Stack } from "@chakra-ui/react";
import { getProducts } from "../.services/order";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import Footer from "../components/Footer";
import Header from "../components//Header";
import CartPage from "./ProductPage";
import CartShopping from "../.page//CartShopping";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
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

  if (loading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Hubo un error al cargar los productos.</Text>;

  return (
    <>
      <Header />
      <Box px={4} py={6} minHeight="calc(100vh - 150px)">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Productos
        </Text>

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
              <Stack direction="row" spacing={4}>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url,
                    })
                  }
                >
                  Agregar al carrito
                </Button>

                <RouterLink to={`/products/${product.id}`}>
                  <Button variant="outline" colorScheme="teal">
                    Ver detalles
                  </Button>
                </RouterLink>
              </Stack>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
};

export default ProductList;
