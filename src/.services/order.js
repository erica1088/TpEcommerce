import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const createProducts = async (name, uid) => {
  const doc = await addDoc(collection(db, "products"), {
    name,
    uid,
    isCompleted: false,
  });

  console.log("Documento escrito con ID: ", doc.id);
  return doc;
};

export const getProducts = async () => {
  const data = await getDocs(collection(db, "products"));
  let products = [];
  data.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    products.push({
      ...doc.data(),
      id: doc.id,
    });
    console.log(products);
  });
  return products;
};

export const getUserProducts = async (uid) => {
  const q = query(collection(db, "products"), where("uid", "==", uid));
  const data = await getDocs(q);

  let products = [];
  data.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    products.push({
      ...doc.data(),
      id: doc.id,
    });
    console.log(products);
  });

  return products;
};
