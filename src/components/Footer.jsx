import React from "react";
import { Box, HStack, IconButton, Text, Flex, Image } from "@chakra-ui/react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      minHeight="60px"
      py={4}
      px={6}
      bg="#d3d1d1"
      bottom={0}
      left={0}
      zIndex={1000}
    >
      {/* Contenedor principal en columna */}
      <Flex direction="column" align="center" maxW="1200px" mx="auto" gap={3}>
        {/* Logo */}
        <Image
          src="/logoH.jpg"
          alt="Logo"
          height={{ base: "40px", md: "50px" }}
          objectFit="contain"
          borderRadius="30px"
        />

        {/* Íconos centrados */}
        <HStack spacing={{ base: 3, md: 4 }} justify="center">
          <IconButton
            as="a"
            href="https://wa.me/1564595781"
            target="_blank"
            icon={<FaWhatsapp />}
            aria-label="WhatsApp"
            variant="ghost"
            boxSize={{ base: 10, md: 12 }}
            _hover={{ color: "green.500" }}
          />
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/erica-samanta-acosta-759a84230/"
            target="_blank"
            icon={<FaLinkedin />}
            aria-label="LinkedIn"
            variant="ghost"
            boxSize={{ base: 10, md: 12 }}
            _hover={{ color: "blue.800" }}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/eriacostaa/?utm_source=qr&igsh=djhxYjYyM2l4N2xo#"
            target="_blank"
            icon={<FaInstagram />}
            aria-label="Instagram"
            variant="ghost"
            boxSize={{ base: 10, md: 12 }}
            _hover={{ color: "pink.500" }}
          />
        </HStack>
      </Flex>

      {/* Copyright */}
      <Text fontSize="xs" textAlign="center" mt={2}>
        © 2025 Erica Acosta. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export default Footer;
