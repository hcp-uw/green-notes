import { initializeApp, cert, /*applicationDefault*/ } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// import serviceAccountKey from "./serviceAccountKey.json" assert { type: "json" };

const app = initializeApp({
  credential: cert("./serviceAccountKey.json"),
});

const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
// export { auth };