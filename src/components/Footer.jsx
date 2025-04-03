import React from "react";
import { Box, HStack, IconButton ,Text, Flex, } from "@chakra-ui/react";
import { FaWhatsapp,  FaLinkedin } from "react-icons/fa";


const Footer = () =>{
  
    return (
        <Box 
        as="footer"
   
        width="100%"
        minHeight="150px"
        py={4}
        px={6}
        bg="#d3d1d1"
        position="fixed"
        bottom={0}
        left={0}
        zIndex={1000}
        >

            <Flex
            justify="space-between"
            align="center"
            maxW="1200px"
            mx="auto"
       
            
            flexDirection={{ base: "column", md: "row" }}
            >
                <Text fontSize="sm" textAlign="center" mb={{ base: 2, md: 0 }}>@2025 Erica Acosta. Todos los derechos reservados</Text>

                <HStack spacing={4}>
                    <IconButton as="a" href="https://wa.me/1564595781"target="_blank" icon={<FaWhatsapp />} aria-label="WhatsApp" variant="ghost" fontSize="2xl" _hover={{ color: "green.500" }}/>
                    <IconButton as="a" href="https://www.linkedin.com/in/erica-samanta-acosta-759a84230/"target="_blank"icon={<FaLinkedin />} aria-label="LinkedIn" variant="ghost" fontSize="2xl" _hover={{ color: "blue.800" }}  />
                    <IconButton as="a" href=""target="_blank"/>
                 

                </HStack>



            </Flex>
  


        </Box>
    )
}

export default Footer