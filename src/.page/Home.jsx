import Header from "../components/Header.jsx";
import { Box, Text, VStack } from "@chakra-ui/react";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts, getUserProducts } from "../.services/order.js";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth;

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
    <div>
      <Header />

      <Box>
        {error && <Text>Hubo un error</Text>}

        {loading && <Text>Loading...</Text>}
        {products?.map((products) => {
          <VStack key={products.id}>
            <Text>{products.name}</Text>
          </VStack>;
        })}

        {!products && !products?.length && <Text>No hay Productos</Text>}
      </Box>

      <Box
        position="relative"
        width="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
        px={4}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundImage="url('/wood.jpg')"
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundAttachment="fixed"
          zIndex={-1}
        >
          
        
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Home;