import React from 'react'

// Returns the login form for logging in
export default function LoginForm() {
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
            autoComplete="password"
            required
            className="authfield"
            placeholder="Password"
        />
        </div>
        <div>
        <button type="submit" className="authsubmit">&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;</button>
        </div>
    </form>
    );
}