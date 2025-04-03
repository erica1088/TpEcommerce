import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const createProducts = async (name, uid) => {
  
  const docRef = await addDoc(collection(db, "order"), {
    name,
    uid,
    isCompleted: false,
   
  });

  console.log("Documento escrito con ID: ", docRef.id);
  return docRef;
} 
