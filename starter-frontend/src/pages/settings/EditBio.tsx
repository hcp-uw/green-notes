import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './settings.css';
import { FetchRoute } from "../../components/file-navigation/routes";

/* Allows the user to edit their bio */

type EditBioProps = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function EditBio({ isModal, setIsModal }: EditBioProps) {
    // const navigate = useNavigate();
    const user = useAuth();

    if (user === null) {
        throw new Error("user object is null");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("currentUser is null, probably not logged in");
    }

    const [bio, setBio] = useState("");
    const [loading, setIsLoading] = useState(false);
    // const setError = user.setError;

    // const handleEditBio = async (e: any) => {
    //     e.preventDefault();

    //     try {
    //         setError("");
    //         // Save button should send bio data to the server, server should take in the data and save it to the db

    //         setIsModal(false);
    //         navigate("/settings");
    //     } catch (e) {
    //         setError("failed to update display name");
    //     }
    // }

    // This might be very wrong
    const handleEditBio = async(): Promise<void> => {
        try {
            setIsLoading(true);
            const token = currentUser && (await currentUser.getIdToken());

            const body = {
                email: currentUser.email,
                bio: bio
            }

            const payloadHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body: JSON.stringify(body)
            }

            fetch(FetchRoute+"/updateBio", payloadHeader)
                .then(() => {
                    setBio(bio);
                    setIsLoading(false);
                })
                .catch(() => console.error("Error fetching /updateBio: Failed to connect to server"));

            setIsModal(false);
        } catch (e) {
            console.log(e);
        }
    }

    // add function that gets the bio stored in firestore to display

    const onOpen = () => {
        setIsModal(!isModal);
    }

    if (isModal) {
        return (
            <div>
            <div className="edit-name-popup"> {/*className="edit-name-popup"*/}
                <form>
                    <div><input id="new-name" type="text" placeholder="Enter your bio" onChange={(e) => setBio(e.target.value)}></input></div>
                    <button onClick={handleEditBio}>Save</button>
                    <button onClick={() => setIsModal(false)}>Cancel</button>
                </form>
            </div>
            <div>
                <p id='bio-text'>{bio || "Your Bio Here"}</p>
                <button id='edit-button' onClick={onOpen}>Edit Bio</button>
            </div>
            </div>
        );
    }
    return (
            <div>
                <p id='bio-text'>{bio || "Your Bio Here"}</p>
                <button id='edit-button' onClick={onOpen}>Edit Bio</button>
            </div>
    );
}