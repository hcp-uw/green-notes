import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type LogoutParams = {isModal: boolean, setIsModal: React.Dispatch<React.SetStateAction<boolean>>}

export default function Logout({ isModal, setIsModal }: LogoutParams) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  // const { logout, setError } = useAuth();
  const used = useAuth();
  if (used === null) {
    throw new Error("bad");
  }

  const logout = used.logout;
  const setError = used.setError;

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

  // TODO: make logout popup and Private routes
  if (!isModal) {
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