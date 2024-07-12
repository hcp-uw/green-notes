//@ts-nocheck
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';

// Returns the regester form for making new accounts
export default function RegisterForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { currentUser, register, setError } = useAuth();

    
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
          navigate("/");
        }
      }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
          }
      
          try {
            setError("");
            setLoading(true);
            await register(email, password).then(() => createAccount(email));
            navigate("/new-profile");
          } catch (e) {
            setError("Failed to register");
          }
      
          setLoading(false);
    }

    const createAccount = async (email: string): void => {    
        try {
            const user = auth.currentUser;
            const token = user && (await user.getIdToken());

            const body = {email: email};
      
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: 'POST',
              body: JSON.stringify(body)
            };

            fetch("http://localhost:3001/createAccount", payloadHeader)

          } catch (e) {
            console.log(e);
          }
    };
    

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
