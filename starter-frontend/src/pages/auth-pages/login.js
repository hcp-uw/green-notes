import React from 'react'
import LoginForm from '../../components/auth/Login'

// Returns the login page
export default function Login() {
    return (
        <div className="page flex green-background">
            <div className="centText">
                <h2 className="placeholder for title text">Login</h2>
                <LoginForm />
            </div>
        </div>
    );
}