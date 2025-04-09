import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { email, password } from "../.utlis/Validations.js";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { login, signInWithGoogle } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });

  return (
    <>
      <Header />
      <Box
        h="100vh"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
        px={4}
      >
        <Box
          w="100%"
          maxW={{ base: "90%", sm: "400px", md: "500px" }}
          px={{ base: 4, md: 8 }}
          py={{ base: 4, md: 10 }}
          boxShadow={{ base: "none", md: "lg" }}
          borderRadius="lg"
          bg={{ base: "transparent", md: "white" }}
        >
          <Heading fontSize={headingSize} mb={6} textAlign="center">
            Iniciar sesión
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email" fontSize="sm">
                  Usuario
                </FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="Ingrese su usuario"
                  {...register("email", email)}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password" fontSize="sm">
                  Contraseña
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    autoComplete="current-password"
                    {...register("password", password)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Button colorScheme="teal" type="submit" width="100%">
                Iniciar sesión
              </Button>

              <Button
                onClick={signInWithGoogle}
                colorScheme="teal"
                width="100%"
                type="button"
                variant="outline"
              >
                Iniciar sesión con Google
              </Button>

              <Text textAlign="center">
                ¿No tienes una cuenta?{" "}
                <Link to="/register">
                  <Button variant="link" colorScheme="teal" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
