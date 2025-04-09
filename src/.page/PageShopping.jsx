import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageShopping = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={20}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        ¡Gracias por tu compra!
      </Text>
      <Text fontSize="lg" mb={2}>
        Tu pedido fue procesado con éxito.
      </Text>
      <Text fontSize="md" mb={6}>
        Nos pondremos en contacto con usted para confirmar el pago y coordinar
        la entrega.
      </Text>
      <Button colorScheme="#333232;" onClick={() => navigate("/products")}>
        Volver a la tienda
      </Button>
    </Box>
  );
};

export default PageShopping;
