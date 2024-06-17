//@ts-nocheck
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Outlet, Link } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ErrorMessage from "./components/auth/ErrorMessage"


const baseURL = 'http://localhost:3001';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get(`${baseURL}/hello`)
  //     .then(res => {
  //       setMessage(res.data); 
  //     })
  //     .catch(error => {
  //       console.error('error fetching data: ', error);
  //     });
  // }, []); 

  // console.log(message);
  return (
    <>
    {/* wrapped everything in AuthProvider so
    everything has access to authentication context */}
    <AuthProvider>
      <Navbar />
      <Outlet />
      <ErrorMessage />
    </AuthProvider>
    </>
  );
}

export default App;
