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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { email, password } from "../.utlis/Validations.js";


export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { login, signInWithGoogle, } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };




  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading>Iniciar sesión </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Usuario</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su usuario"
            {...register("email", email)}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
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
       
        <Button mt={4} colorScheme="teal" type="submit" width="100%">
          Iniciar sesion
        </Button>
        <Button
          onClick={signInWithGoogle}
          mt={4}
          colorScheme="teal"
          width="100%"
          type="button"
        >
          Iniciar sesión con Google
        </Button>

      </form>

      
    </Box>
  );
};

export default Login;
