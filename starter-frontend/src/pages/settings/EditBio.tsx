import { db } from '../../../../starter-backend/src/config/firebase-config';
import { doc, updateDoc } from "firebase/firestore";
  
// export async function EditBioField(): Promise<void> {
//   const userRef = doc(db, "users", "frank");

//   await updateDoc(userRef, {
//       "favorites.color": "Red"
//   });

//   db.collection("users").doc("frank").update({
//     "favorites.firebase": "Help")};
// }
