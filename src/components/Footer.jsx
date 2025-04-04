import React from "react";
import { Box, HStack, IconButton, Text, Flex } from "@chakra-ui/react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsJustify } from "react-icons/bs";

const Footer = () => {
  return (
    <Box
      as="footer"
      color="white"
      width="100%"
      minHeight="150px"
      py={8}
      px={6}
      bg="#d3d1d1"
      position="relative"
      bottom={0}
      left={0}
      zIndex={1000}
    >
      <Flex
        justify="center"
        align="center"
        maxW="1200px"
        mx="auto"
        direction={"column"}
        height={"100%"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <HStack spacing={4}>
          <IconButton
            as="a"
            href="https://wa.me/1564595781"
            target="_blank"
            icon={<FaWhatsapp />}
            aria-label="WhatsApp"
            variant="ghost"
            fontSize="2xl"
            _hover={{ color: "green.500" }}
          />
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/erica-samanta-acosta-759a84230/"
            target="_blank"
            icon={<FaLinkedin />}
            aria-label="LinkedIn"
            variant="ghost"
            fontSize="2xl"
            _hover={{ color: "blue.800" }}
          />
          <IconButton as="a" href="https://www.instagram.com/eriacostaa/?utm_source=qr&igsh=djhxYjYyM2l4N2xo#" target="_blank"icon={<FaInstagram />}
            aria-label="LinkedIn"
            variant="ghost"
            fontSize="2xl"
            _hover={{ color: "blue.800" }} />
        </HStack>
      </Flex>

      <Text fontSize="sm" textAlign="center" mt={4}>
        @2025 Erica Acosta. Todos los derechos reservados
      </Text>
    </Box>
  );
};

export default Footer;
