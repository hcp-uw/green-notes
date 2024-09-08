import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './settings.css';

/* Allows the user to edit their display name */

type EditDisplayNameProps = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function EditName({ isModal, setIsModal }: EditDisplayNameProps) {
    const navigate = useNavigate();
    const user = useAuth();

    if (user === null) {
        throw new Error("user object is null");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("currentUser is null, probably not logged in");
    }

    const [name, setName] = useState("");
    const setError = user.setError;

    const handleEditDisplayName = async (e: any) => {
        e.preventDefault();

        try {
            setError("");
            await user.updateUserProfile(currentUser, { displayName: name });

            setIsModal(false);
            navigate("/settings");
        } catch (e) {
            setError("failed to update display name");
        }
    }

    if (!isModal) {
        return null;
    } else {
        return (
            <div className="edit-name-popup">
                <form>
                    <div><input id="new-name" type="text" placeholder="Enter new display name" onChange={(e) => setName(e.target.value)}></input></div>
                    <button onClick={handleEditDisplayName}>Save</button>
                    <button onClick={() => setIsModal(false)}>Cancel</button>
                </form>
            </div>
        );
    }
}