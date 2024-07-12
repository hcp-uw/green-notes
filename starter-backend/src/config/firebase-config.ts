import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: cert("./serviceAccountKey.json"),
});

// auth variable used for authentication purposes
const auth = getAuth(app);

// db variable used for firestore db purposes
const db = getFirestore();

export { auth, db };
