import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";

/** Login input element */
export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    // const { currentUser, login, setError } = useAuth();
    const used = useAuth();
    if (used === null) {
      throw new Error("user object is null");
    }

    const currentUser = used.currentUser;
    const login = used.login;
    const setError = used.setError;




    const navigate = useNavigate();

    /** Redirects home if client is logged in */
    useEffect(() => {
        if (currentUser) {
          navigate("/");
        }
      }, [currentUser, navigate]);

  /** Handles client logging in. If succesful, redirects to notes page */
  async function handleFormSubmit(e: any) {
        e.preventDefault();
      
          try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/notes");
          } catch (e) {
            setError("Failed to login");
          }
      
          setLoading(false);
    }



    return (
    <form className="authform" onSubmit={handleFormSubmit}>
        <div>
        <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            pattern=".*\S+.*"
            className="authfield"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            pattern=".*\S+.*"
            className="authfield"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div>
        <button type="submit" className="authsubmit" disabled={loading}>
            &nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;
        </button>
        </div>
    </form>
    );
}
