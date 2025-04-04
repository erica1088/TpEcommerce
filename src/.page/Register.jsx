import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { email, password } from "../.utlis/Validations.js";

export const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, formState, handleSubmit } = useForm();
  const { registerUser } = useAuth();
  const { errors } = formState;

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email field */}
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Usuario</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su usuario"
            autoComplete="username"
            {...register("email", email)}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Password field */}
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
          Registrarme
        </Button>
      </form>
     
    </Box>
    
  );
};

export default Register;
