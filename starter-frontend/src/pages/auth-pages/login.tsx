//@ts-nocheck
import React from 'react'
import LoginForm from '../../components/auth/Login'
import { Link } from 'react-router-dom';

// Returns the login page
export default function Login() {
    return (
        <div className="page flex green-background">
            <div className="centText">
                <h2 className="placeholder for title text">Login</h2>
                <LoginForm />
                <Link to='../register' className="authlink">Don't have an account? Register</Link>
            </div>
        </div>
    );
}
