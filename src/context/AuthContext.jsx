import { children, createContext, useContext, useState } from "react";
import { password, username } from "../.utlis/Validations";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({email, password}) =>{

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      });
    

  }
  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      //console.log(userCredential)
       
          const user = userCredential.user;
          return user
        }
        catch(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          
        };
  
  };
  return (
    <AuthContext.Provider value={{ user, registerUser, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
