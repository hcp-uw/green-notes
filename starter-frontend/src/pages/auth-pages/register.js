import React from 'react'
import RegisterForm from '../../components/auth/Register'
import { Link } from 'react-router-dom';

// Returns the register page
export default function Register() {
    return (
        <div className="page flex green-background">
            <div className="centText">
                <h2 className="placeholder for title text">Register your account</h2>
                <RegisterForm />
                <Link to={'../login'} className="authlink">Already have an account? Login</Link>
            </div>
        </div>
    );
}