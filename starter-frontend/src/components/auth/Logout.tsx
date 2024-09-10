import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/** Parameters for logout modal */
type LogoutParams = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

/** Modal to allow client to logout */
export default function Logout({ isModal, setIsModal }: LogoutParams) {
  const navigate = useNavigate();

  // const { logout, setError } = useAuth();
  const used = useAuth();
  if (used === null) {
    throw new Error("user object is null");
  }

  const logout = used.logout;
  const setError = used.setError;

  /** Handles client logging out and redirects to login page */
  async function handleLogout() {
    try {
      setError("");
      await logout();
      setIsModal(false);
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }


  if (!isModal) { // If modal is closed
    return null;
  } else {
    return (
      <div>
          <div className="centText logout-popup">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setIsModal(false)}>Cancel</button>
          </div>
      </div>
    );
  }
}