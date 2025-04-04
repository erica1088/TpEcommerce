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
import { set } from "react-hook-form";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();


 useEffect(() =>{
  onAuthStateChanged(auth, (user) =>{
    if(user){
      
      const uid = user.uid;
      setUser(uid)
      console.log("ya estas logueado")
    } else{
      
      console.log("ya estas logueado")
      setUser(null)
    }
  })

 },[])

  //Funcion de Login

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)

        setUser(user.uid);
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
        password
      );
      console.log(userCredential);

    
      const user = userCredential.user;
      console.log(user);

      return user;
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  //funcion para logearse con google

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = (async = signInWithPopup(auth, provider));
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accesToken;
      console.log(token)

      const user = result.user;
      console.log(user, "autenticado");
      return user;
    } catch (error) {
      console.log(error.message);
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

        })
        setUser(user);
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
