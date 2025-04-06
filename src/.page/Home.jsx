import Header from "../components/Header.jsx";
import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer.jsx";

import { useEffect, useState } from "react";
import { getProducts } from "../.services/order.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
            m={{ base: 8, md: 120}}
          >
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              fontWeight="bold"
              mb={10}
            >
              <span style={{ color: "#ffff" }}>Home Wood</span>
            </Text>
            <Text fontSize={{ base: "sm", md: "lg" }} mb={6}>
              Encontra los mejores muebles de madera artesanal para tu hogar
            </Text>
            <Button
              colorScheme="#333333;"
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 10 }}
              onClick={() => navigate("/products")}
              _hover={{ bg: "gray.200" }}
            >
              Ver productos
            </Button>
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Flex>
  );
};

export default Home;
