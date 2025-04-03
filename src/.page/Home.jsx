import Header from "../components/Header.jsx";
import { Box, VStack } from "@chakra-ui/react";
import  Footer  from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";


const Home = () => {
  return (
    <div>
      <Header />
      <Footer/>

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

<Box
        // position="absolute"
        // top={0}
        // left={0}
        // width="100%"
        // height="100%"
        // bg="black"
        // opacity={0.5} 
        // zIndex={-1}
      />
{/* 
      <VStack spacing={4}>
        <Text fontSize={{base: "3xl", md:"5xl"}} fontWeight="bold">

          Home wood 

        </Text>
        <Text fontSize={{base:"lg", md:"2xl"}} >
          Ver Productos

        </Text>
        <Link>
        
        </Link>
      </VStack> */}

      </Box>
      
      </Box>
     
    </div>
  );
};

export default Home;
