import React from 'react'

// Returns the login form for logging in
export default function LoginForm() {
    return (
    <form>
        <div>
        <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="FIX LATER!!!"
            placeholder="Email address"
        />
        </div>
        <div>
        <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            className="FIX LATER!!!"
            placeholder="Password"
        />
        </div>
    </form>
    );
}