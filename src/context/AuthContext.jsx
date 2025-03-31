import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
    <AuthContext.Provider value={{ user, registerUser }}>
      {Children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
