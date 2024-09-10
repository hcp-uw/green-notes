import { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';
import './settings.css';
import { isRecord, FetchRoute } from "../../components/file-navigation/routes";

/* Allows the user to edit their bio */

type EditBioProps = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function EditBio({ isModal, setIsModal }: EditBioProps) {
    const user = useAuth();

    if (user === null) {
        throw new Error("user object is null");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("currentUser is null, probably not logged in");
    }
    if (currentUser.email === null) {
        throw new Error("User is not logged in / doesn't have email")
    }

    const [bio, setBio] = useState("");
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        getBio();
    }, [])

    // fetches the user's bio
    const getBio = async(): Promise<void> => {
        try {
            const token = currentUser && (await currentUser.getIdToken());
      
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "GET"
            };

            fetch(FetchRoute + "/getBio?route=" + encodeURIComponent("Users/" + currentUser.email), payloadHeader)
                .then((res) => {
                    res.json().then((val) => fetchResponse(val))
                })
                .catch(() => console.error("Error fetching /getBio: Failed to connect to server"))
        } catch (e) {
            console.log(e);
        }
    }

    // helper function for fetching user's bio
    const fetchResponse = (val: unknown): void => {
        if (!isRecord(val)) {
            console.error('Invalid JSON from /getBio', val);
            return;
        }
        console.log(val.data);
        if (typeof val.data !== 'string') {
            console.error('Invalid JSON from /getBio', val);
            return;
        }

        setBio(val.data);
        setIsLoading(false);
    }

    // saves an updated bio to the database
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

    const onOpen = () => {
        setIsModal(!isModal);
    }

    if (isModal) {
        return (
            <div>
            <div className="edit-name-popup"> {/*className="edit-name-popup"*/}
                <div><input id="new-name" type="text" placeholder="Enter your bio" onChange={(e) => setBio(e.target.value)}></input></div>
                <button onClick={handleEditBio}>Save</button>
                <button onClick={() => setIsModal(false)}>Cancel</button>
            </div>
            <div>
                <div id='bio-text'>{bio}</div>
                <button id='edit-button' onClick={onOpen}>Edit Bio</button>
            </div>
            </div>
        );
    }
    if (loading) {
        return (
            <p id='bio-text'>Loading...</p>
        )
    }
    return (
            <div>
                <div id='bio-text'>{bio}</div>
                <button id='edit-button' onClick={onOpen}>Edit Bio</button>
            </div>
    );
}