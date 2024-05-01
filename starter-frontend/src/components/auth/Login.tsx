//@ts-nocheck
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";

// Returns the login form for logging in
export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { currentUser, register, setError } = useAuth();


    const navigate = useNavigate();

    async function handleFormSubmit(e) {
        e.preventDefault();
      
          try {
            setError("");
            setLoading(true);
            await register(email, password);
            navigate("/profile");
          } catch (e) {
            setError("Failed to register");
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
