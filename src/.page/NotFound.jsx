import React from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10} py={10}>
      <Box textAlign="center" py={10}>
        <Text fontSize="3xl" fontWeight="bold">
          404 - Página no encontrada
        </Text>
        <Text>La página que buscas no existe.</Text>
      </Box>

      <Button colorScheme="blue" mt={6} onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
