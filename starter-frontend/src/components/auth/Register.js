import React from 'react'

// Returns the regester form for making new accounts
export default function RegisterForm() {
    return (
        <form className="authform">
            <div>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="authfield"
                    placeholder="Email address"
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
                />
            </div>
        </form>
        );
}