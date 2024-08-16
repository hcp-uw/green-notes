import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './settings.css';

type DeleteAccountProps = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function Delete({ isModal, setIsModal }: DeleteAccountProps) {
    const navigate = useNavigate();

    const user = useAuth();

    async function handleDeleteAccount() {
        if (user === null) {
            throw new Error("Not logged in");
        }
        const currentUser = user.currentUser;
        if (currentUser === null) {
            throw new Error("Not logged in");
        }
        user.deleteAccount(currentUser);
        setIsModal(false);
        navigate("/login");
    }

    if (!isModal) {
        return null;
    } else {
        return (
            <div className="delete-account-popup">
                <h3>Are you sure you want to delete your account? All of your notes will be lost!!</h3>
                <button onClick={handleDeleteAccount}>Delete</button>
                <button onClick={() => setIsModal(false)}>Cancel</button>
            </div>
        );
    }
}