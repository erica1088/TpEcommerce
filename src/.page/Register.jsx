import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react"; 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { Navigate } from "react-router-dom"; 

import { useAuth } from "../context/AuthContext.jsx";

export const Register = () =>{
  
        const [show, setShow] = useState(false);
        const handleClick = () => setShow(!show);
        const { register, formState, handleSubmit } = useForm();
        const { errors } = formState;
      
        const { registerUser } = useAuth();
       
      
        const onSubmit = (data) => {
          registerUser(data);
        };
        return (
          <Box maxW="400px" mx="auto" mt="10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Usuario</FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="Ingresa tu nombre/usuario"
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
                    {...register("password", password)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
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


export default Register