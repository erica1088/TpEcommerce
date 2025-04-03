import { Button, Heading, Box, Input } from "@chakra-ui/react";
import { useState } from "react";

import { createProducts } from "../.services/orders";
import { useAuth } from "../context/AuthContext";

export const Create = () => {
  const [values, setValues] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  console.log(user);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);

    if (!user || !user.uid) {
      setError(true);
      console.log("Usuario no autenticado");
      setLoading(false);
      return;
    }
    try {
      const order = await createProducts(values.name, user); //

      console.log(order);
      setValues({ name: "" });
    } catch (error) {
      setError(true);
      console.log("Error al crear producto:", error.message);

      if (error.message === "Usuario no autenticado") {
        alert("Por favor, inicia sesión para poder crear un producto.");
      }
    } finally {
      setLoading(false);
    }
  };
  //   try {
  //     const orders = await createProducts(values.name, user.uid);
  //     console.log(orders);
  //   } catch (error) {
  //     setError(true);
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box maxW={"400px"} mx={"auto"} mt={"10px"} p={6}>
      <Heading>Crear orders</Heading>

      <form onSubmit={onSubmit}>
        <div>
          <Input
            type="text"
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter orders"
            autoComplete="off"
          />
        </div>
        {error && <p>Hubo un error</p>}
        <Button m={2} type="submit">
          {loading ? "creando..." : "crear todo"}
        </Button>
      </form>
    </Box>
  );
};
