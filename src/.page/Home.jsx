import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Box, Text, Button, Flex, Spinner, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "../.services/order.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = chakra(motion.div);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Flex direction="column" minHeight="100vh">
      <Header />

      {/* Hero Section */}
      <Box
        flex="1"
        position="relative"
        height={{ base: "80vh", md: "100vh" }}
        px={{ base: 4, md: 12 }}
        py={{ base: 8, md: 15 }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundImage="url('/wood.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          zIndex={-1}
        />

        <Flex
          align="center"
          justify="center"
          direction="column"
          textAlign="center"
          height="100%"
          color="white"
          px={4}
          zIndex={1}
          position="relative"
        >
          <Box
            bg="rgba(0, 0, 0, 0.5)"
            p={{ base: 4, md: 8 }}
            borderRadius="xl"
            maxW="90%"
            m={{ base: 8, md: 120 }}
          >
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              fontWeight="bold"
              mb={10}
            >
              <span style={{ color: "#ffff" }}>Home Wood</span>
            </Text>
            <Text fontSize={{ base: "sm", md: "lg" }} mb={6}>
              Encontra los mejores muebles de Madera artesanal para tu hogar
            </Text>
            <Button
              bg="#333"
              color="white"
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 10 }}
              onClick={() => navigate("/products")}
              _hover={{ bg: "gray.700" }}
            >
              Ver productos
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* Productos destacados */}
      <Box
        px={{ base: 4, md: 12 }}
        py={{ base: 8, md: 12 }}
        bg="gray.50"
        minH="300px"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={6}
          textAlign="center"
          fontFamily="'Playfair Display', serif"
        >
          Productos destacados
        </Text>

        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="gray.600" />
          </Flex>
        ) : error ? (
          <Text color="red.500" textAlign="center">
            Ocurrió un error al cargar los productos.
          </Text>
        ) : (
          <Flex wrap="wrap" justify="center" gap={{ base: 4, md: 6 }}>
            {products.slice(0, 3).map((product, index) => (
              <MotionBox
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                width={{ base: "100%", sm: "300px" }}
                height={{ base: "360px", md: "380px" }} // Altura fija
                p={4}
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                whileHover={{ scale: 1.05 }}
                cursor="pointer"
                _hover={{ boxShadow: "xl" }}
              >
                <Box
                  as="img"
                  src={product.image_url}
                  alt={product.name}
                  borderRadius="lg"
                  height="180px"
                  objectFit="cover"
                  width="100%"
                  mb={4}
                  overflow="hidden"
                />
                <Text fontSize="lg" fontWeight="semibold">
                  {product.name}
                </Text>

                <Button
                  colorScheme="#a88e88;"
                  onClick={() => navigate("/products")}
                  box-sizing="inherit"
                >
                  Ver más
                </Button>
              </MotionBox>
            ))}
          </Flex>
        )}
      </Box>

      <Footer />
    </Flex>
  );
};

export default Home;
