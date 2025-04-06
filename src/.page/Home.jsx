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
        py={{ base: 8, md: 16 }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100vh"
          backgroundImage="url('/wood.jpg')"
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          zIndex={-1}
        />
        <Flex
          align="center"
          justify="center"
          direction="column"
          textAlign="center"
          height="100vh"
          color="white"
          px={4}
          zIndex={1}
          position="relative"
        >
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            Home Wood
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            mt={6}
            onClick={() => navigate("/products")}
          >
            Ver más
          </Button>
        </Flex>
      </Box>

      <Footer />
    </Flex>
  );
};

export default Home;
