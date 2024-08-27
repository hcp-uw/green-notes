import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
        signOut, User, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import { updateProfile } from "firebase/auth";


/** Used for context parameters */
interface ContextParams {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  updateUserProfile: (user: User, profile: any) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: (user: User) => Promise<void>;
}

/** Returns a Consumer and Procider compenent.
 * Provider gives state to its children. 
 * Takes in the value prop and passes it down to child components.
 * Consumer consumes and uses the state passed down to it by the provider 
*/
const AuthContext = createContext<ContextParams | null>(null);

/** useAuth hook allows us to consume context by returning
 * a useContext instance of AuthContext
*/
export function useAuth() {
    return useContext(AuthContext);
}

/** Parameters for AuthProvider */
type AuthProviderParams = {children: any}

export function AuthProvider({ children }: AuthProviderParams) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

  
    function register(email: string, password: string) {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  
    function login(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    function updateUserProfile(user: User, profile: any) {
      return updateProfile(user, profile);
    }

    function logout() {
      return signOut(auth);
    }

    function deleteAccount(user: User) {
      return user.delete();
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
      deleteAccount
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
