//@ts-nocheck
import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { updateProfile } from "firebase/auth";




// returns a Consumer and Procider compenent.
// Provider gives state to its children. 
// Takes in the value prop and passes it down to child components.
// Confumer consumes and uses the state passed down to it by the provider
const AuthContext = createContext();

// useAuth hook allows us to consume context by returning
// a useContext instance of AuthContext
export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  
    function register(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  
    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    function updateUserProfile(user, profile) {
      return updateProfile(user, profile);
    }

    function logout() {
      return signOut(auth);
    }
  
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
      login,
      register,
      error,
      setError,
      updateUserProfile,
      logout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
