import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './Navigation';

const baseURL = 'http://localhost:3001';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/hello`)
      .then(res => {
        setMessage(res.data); 
      })
      .catch(error => {
        console.error('error fetching data: ', error);
      });
  }, []); 

  console.log(message);
  return (
    <>
      <NavigationBar />
    </>
  );
}

export default App;
