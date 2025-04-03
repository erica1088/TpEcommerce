import { createContext, useContext, useState, useEffect } from "react";
import { auth,  } from "../firebase/config.js";
import { useToast } from "@chakra-ui/react";
import { email, password } from "../.utlis/Validations.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth
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


 

  //Funcion de Login

  const login = async ({ email, password }) => {
    const auth = getAuth();  
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  


  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
     
      console.log(userCredential);

      const user = userCredential.user;
      console.log(user);

      return user

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
  
    }
  };


  
  //funcion para logearse con google

  const signInWithGoogle = async () => {
 
    const provider = new GoogleAuthProvider();

    try {
      const result = async= signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accesToken;

      const user = result.user;
      console.log (user, "autenticado");
      return user
      
    } catch (error) {
      console.log(error.message)

      
    }
    
  };

  //Funcion para cerrar sesion



   const Logout = () => {
    signOut(auth)
       .then(() => {
         toast({
           title: "Sing off Correct",
           status: "info",
           isClosable: true,
           duration: 3000,
         });
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
