
import React from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="xl" color="red.500">
        404 - Página no encontrada
      </Heading>
      <Text fontSize="lg" mt={4}>
        La página que buscas no existe.
      </Text>
      <Button colorScheme="blue" mt={6} onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
