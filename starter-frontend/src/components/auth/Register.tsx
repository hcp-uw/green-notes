//@ts-nocheck
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

// Returns the regester form for making new accounts
export default function RegisterForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { currentUser, register, setError } = useAuth();

    
    const navigate = useNavigate();

    async function handleFormSubmit(e) {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
          }
      
          try {
            setError("");
            setLoading(true);
            await register(email, password);
            navigate("/new-profile");
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
                    autoComplete="current-password"
                    required
                    className="authfield"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="authfield"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <button type="submit" className="authsubmit" disabled={loading}>Create Account</button>
            </div>
        </form>
        );
}
