import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react"; 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { Navigate } from "react-router-dom"; 

import { useAuth } from "../../context/AuthContext";

const Register = () =>{

    const [show, setShow] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { registerUser } = useAuth();

  const handleClick = () => setShow(!show);

  const onSubmit = async (data) =>{
    setIsSubmitting(true);

    try{
        await registerUser(data);
        setIsRegistered(true);
    }  catch (error) {
        console.error("Error during registration:", error);
      } finally {
        setIsSubmitting(false);
      }

  }

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading>Nuevo usuario</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Usuario</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingrese su usuario"
            {...register("email", { 
              required: "Este campo es obligatorio", 
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Por favor, ingrese un correo válido"
              } 
            })}
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
              {...register("password", { 
                required: "Este campo es obligatorio", 
                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } 
              })}
            />
            <InputRightElement width="4.5rem">
              <IconButton 
                h="1.75rem" 
                size="sm" 
                icon={show ? <FiEyeOff /> : <FiEye />} 
                onClick={handleClick}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button 
          mt={4} 
          borderRadius="25px" 
          colorScheme="teal" 
          type="submit" 
          width="100%" 
          isLoading={isSubmitting}  // Desactivar el botón mientras se procesa el registro
        >
          {isSubmitting ? <Spinner size="sm" /> : "Registrarme"}
        </Button>
      </form>
    </Box>
  );

}

export default Register