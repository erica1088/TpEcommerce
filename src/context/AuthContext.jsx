import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config.js";
import { useToast } from "@chakra-ui/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("ya estas logueado");
      } else {
        setUser(null);
        console.log("no estas logueado");
      }
    });
  }, []);

  // Funcion de Login
  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        toast({
          title: "Bienvenido",
          description: "Iniciaste sesión con éxito.",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        navigate("/account");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast({
          title: "Error",
          description: "No se pudo iniciar sesión. Inténtalo de nuevo.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      });
  };

  // Funcion de Registro
  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  // Login con Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user, "autenticado");
      setUser(user); //
      navigate("/account");
      return user;
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión con Google.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  // Logout
  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente.",
          status: "info",
          isClosable: true,
          duration: 3000,
        });
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, login, Logout, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
