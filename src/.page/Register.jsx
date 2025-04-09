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
  Alert,
  AlertIcon,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { email, password } from "../.utlis/Validations.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Register = () => {
  const [show, setShow] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { register, formState, handleSubmit } = useForm();
  const { registerUser } = useAuth();
  const { errors } = formState;
  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setIsRegistered(true);
      toast({
        title: "Se ha registrado con éxito",
        description: "Ahora puedes iniciar sesión.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error al registrar",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
          <Heading
            fontSize={{ base: "lg", sm: "lg" }}
            mb={6}
            textAlign="center"
          >
            Nuevo Usuario
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
                  autoComplete="username"
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
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Stack>

            <Button
              mt={6}
              colorScheme="teal"
              type="submit"
              width="100%"
              size="md"
            >
              Registrarme
            </Button>
          </form>

          {isRegistered && (
            <Alert status="success" mt={4} fontSize="sm" borderRadius="md">
              <AlertIcon />
              Se ha registrado con éxito.
            </Alert>
          )}
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Register;
