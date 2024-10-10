import React from 'react'
import RegisterForm from '../../components/auth/Register'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { FetchRoute } from '../../components/file-navigation/routes';

/** Register page */
export default function Register(): JSX.Element {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkServer = async(): Promise<void> => {
            try {
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());
          
                const payloadHeader = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  method: "GET"
                };

                fetch(FetchRoute+"/isUp", payloadHeader)
                    .then((res) => {
                        if (res.status === 200) {

                            res.json().then((val) => fetchResponse(val))
                                .catch(() => console.error("Error fetching /isUp: 200 response is not JSON"))
                        } else {
                            console.error(`Error fetching /isUp: bad status code ${res.status}`)
                        }
                    })
                    .catch(() => console.error("Error fetching /isUp: Failed to connect to server"));
                
        
              } catch (e) {
                console.log(e);
              }
        }

        const fetchResponse = (val: unknown): void => {
            setIsLoading(false);
        }

        checkServer();

    }, [])

    if (isLoading) {
        return (
            <div className="page flex green-background">
            <div className="centText">
                <h2 className="placeholder for title text">Register your account</h2>
                <h1>Loading...</h1>
                <Link to={'../login'} className="authlink">Already have an account? Login</Link>
            </div>
        </div>
        )
    }
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
