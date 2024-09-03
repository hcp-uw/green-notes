import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import smile from '../../assets/profile-button.png';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

// edit profile page


/** New Profile page */
export default function NewProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  // const { currentUser, updateUserProfile, setError } = useAuth();

  const used = useAuth();
  if (used === null) {
    throw new Error("bad");
  }

  const currentUser = used.currentUser;
  const updateUserProfile = used.updateUserProfile;
  const setError = used.setError;

  if (currentUser === null) {
    throw new Error("user can't be null right now");
  }


  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const fileRef = ref(storage, 'profile-button.png')
      const photo = await getDownloadURL(fileRef);
      const profile = {
        displayName: username,
        photoURL: photo,
      };
      await updateUserProfile(user, profile);
      navigate("/notes");
    } catch (e) {
      setError("Failed to update profile");
    }

    setLoading(false);
  };

  return (
    <div className="flex page green-background">
      <div className="centText">
        <h2>Customize your profile</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Plan to have image clickable. Brings up pop-up
              which allows people to choose color and accessories */}
          <div><img src={smile} className="prof-img"/></div>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Enter a Display Name"
              className="authfield"
              // defaultValue={currentUser.displayName && currentUser.displayName}
                onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div>
            <button type="submit" disabled={loading} className="authsubmit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}