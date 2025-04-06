import { Button, Heading, Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { createProducts } from "../.services/order";
import { useAuth } from "../context/AuthContext";

export const Create = () => {
  const [values, setValues] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await createProducts(values.name, user);
      setSuccess(true);
      setValues({ name: "" });
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        {success && <p>¡Producto creado con éxito!</p>}
        <Button m={2} type="submit">
          {loading ? "Creando..." : "Crear producto"}
        </Button>
      </form>
    </Box>
  );
};
