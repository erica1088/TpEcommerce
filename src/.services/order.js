import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const createProducts = async (cart, uid) => {
  const productRefs = [];

  for (const product of cart) {
    const doc = await addDoc(collection(db, "products"), {
      name: product.name,
      price: product.price,
      uid,
      quantity: product.quantity,
      productId: product.id,
      image_url: product.image_url,
      createdAt: new Date(),
    });
    productRefs.push(doc);
  }

  return productRefs;
};

export const getProducts = async () => {
  const data = await getDocs(collection(db, "products"));
  let products = [];
  data.forEach((doc) => {
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
    products.push({
      ...doc.data(),
      id: doc.id,
    });
    console.log(products);
  });

  return products;
};
