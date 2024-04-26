import React from 'react'

// Returns the regester form for making new accounts
export default function RegisterForm() {
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
                    autoComplete="current-password"
                    required
                    className="FIX LATER!!!"
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
                    className="FIX LATER!!!"
                    placeholder="Password"
                />
            </div>
        </form>
        );
}