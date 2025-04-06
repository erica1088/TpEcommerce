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
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { email, password } from "../.utlis/Validations.js";
import { useNavigate } from "react-router-dom";

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
    <Box
      maxW={{ base: "90%", sm: "400px" }}
      mx="auto"
      mt={{ base: "8", sm: "10" }}
      p={{ base: "4", sm: "6" }}
    >
      <Heading fontSize={{ base: "2xl", sm: "3xl" }} mb={4}>
        Nuevo Usuario
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email" fontSize={{ base: "sm", sm: "md" }}>
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
          <FormLabel htmlFor="password" fontSize={{ base: "sm", sm: "md" }}>
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
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          width="100%"
          size="lg"
          variant="solid"
        >
          Registrarme
        </Button>
      </form>

      {isRegistered && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Se ha registrado con éxito.
        </Alert>
      )}
    </Box>
  );
};

export default Register;
