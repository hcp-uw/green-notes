// import { db } from '../../../../starter-backend/src/config/firebase-config';
// import { doc, updateDoc } from "firebase/firestore";
  
// export async function EditBioField(): Promise<void> {
//   const userRef = doc(db, "users", "frank");

//   await updateDoc(userRef, {
//       "favorites.color": "Red"
//   });

//   db.collection("users").doc("frank").update({
//     "favorites.firebase": "Help")};
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './settings.css';

/* Allows the user to edit their bio */

type EditBioProps = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function EditBio({ isModal, setIsModal }: EditBioProps) {
    const navigate = useNavigate();
    const user = useAuth();

    if (user === null) {
        throw new Error("Not logged in");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("Not logged in");
    }

    const [bio, setBio] = useState("");
    const setError = user.setError;

    const handleEditBio = async (e: any) => {
        // e.preventDefault();

        // try {
        //     setError("");
        //     await user.updateUserProfile(currentUser, { displayName: name });

        //     setIsModal(false);
        //     navigate("/settings");
        // } catch (e) {
        //     setError("failed to update display name");
        // }
    }

    if (!isModal) {
        return null;
    } else {
        return (
            <div className="edit-name-popup">
                <form>
                    <div><input id="new-name" type="text" placeholder="Enter your bio" onChange={(e) => setBio(e.target.value)}></input></div>
                    <button onClick={handleEditBio}>Save</button>
                    <button onClick={() => setIsModal(false)}>Cancel</button>
                </form>
            </div>
        );
    }
}