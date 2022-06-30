import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { CheckoutOrder } from "../components/Cart/models/checkout-order.model";

import { Meal } from "../models/meal.model";
import { DUMMY_MEALS } from "./dummy-meals";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const getMeals = async (ignore: boolean): Promise<Meal[]> => {
  const db = getFirestore(app);
  const mealsCol = collection(db, "meals");
  const mealSnapshot = await getDocs(mealsCol);
  let mealList = mealSnapshot.docs.map((doc) => {
    const currentData = doc.data();
    return {
      id: doc.id,
      name: currentData.name,
      description: currentData.description,
      price: currentData.price,
    } as Meal;
  });

  if (mealList.length === 0 && !ignore) {
    //add data to firebase
    DUMMY_MEALS.forEach(async (meal) => {
      await setDoc(doc(mealsCol), {
        name: meal.name,
        description: meal.description,
        price: meal.price,
      });
    });

    const querySnapshot = await getDocs(mealsCol);
    mealList = querySnapshot.docs.map((doc) => {
      const currentData = doc.data();

      return {
        id: doc.id,
        name: currentData.name,
        description: currentData.description,
        price: currentData.price,
      } as Meal;
    });
  }

  return mealList;
};

export const createOrder = async (order: CheckoutOrder): Promise<void> => {
  const db = getFirestore(app);
  const ordersCol = collection(db, "orders");

  await setDoc(doc(ordersCol), order);
};

export default app;
