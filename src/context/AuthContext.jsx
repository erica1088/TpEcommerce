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
import {
  Box,
  CloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const showAlert = (title, description, status) => {
    setAlert({ title, description, status });
    setTimeout(() => setAlert(null), 4000);
  };
  //Funcion de Login

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.uid);
        setUser(userCredential.user);
        showAlert(
          "Inicio de sesión exitoso",
          "Has iniciado sesión correctamente.",
          "success"
        );
        Navigate("/");

        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        showAlert("Error al iniciar sesión", error.message, "error");
      });
  };

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      showAlert(
        "Registro exitoso",
        "Tu cuenta ha sido creada con éxito.",
        "success"
      );
      Navigate("/");
      console.log(userCredential);

      const user = userCredential.user;
      console.log(user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert("Error al registrarse");
    }
  };
  //funcion para logearse con google

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("error al iniciar sesion con Google:", error.message);
      showAlert("Error al iniciar sesión", error.message, "error");
    }
  };

  //Funcion para cerrar sesion

  const Logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      showAlert("Sesión Cerrada", "Has cerrado sesión", "info");
      Navigate("/");
    } catch (error) {
      console.log("Error al cerrar sesión", error);
    }
  };

  // const Logout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       toast({
  //         title: "Sing off Correct",
  //         status: "info",
  //         isClosable: true,
  //         duration: 3000,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, login, Logout, signInWithGoogle }}
    >
      {alert && (
        <Box
          position="fixed"
          top="20px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          width="80%"
          maxW="400px"
        >
          <Alert
            status={alert.status}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            borderRadius="md"
            boxShadow="lg"
          >
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {alert.title}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {alert.description}
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
