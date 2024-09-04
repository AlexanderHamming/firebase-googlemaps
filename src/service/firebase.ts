import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, DocumentData, CollectionReference } from "firebase/firestore";
import { Restaurant } from "../types/User.types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firedb = getFirestore(app);

export const storage = getStorage(app);

// Helper to add type to collection references
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firedb, collectionName) as CollectionReference<T>;
};

// When creating new collections, add them here.
// Example:
// export const exampleCollection = createCollection<CollectionType>("example");

// Collections
export const restaurantsCollection = createCollection<Restaurant>("restaurants");
