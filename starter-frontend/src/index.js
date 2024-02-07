import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page";
// import "./App.css";
import AboutUs from './pages/about-us';
import Collaboration from './pages/collaboration';
import HomeScreen from './pages/Home';
import Note from './pages/note';
import Notes from './pages/notes';
import Profile from './pages/profile';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "about-us",
        element: <AboutUs />,
      }, 
      {
        path: "collaboration",
        element: <Collaboration />,
      }, 
      {
        path: "note/:noteId",
        element: <Note />,
      }, 
      {
        path: "notes",
        element: <Notes />,
      }, 
      {
        path: "profile/:profileId", 
        element: <Profile />,
      }, 
      
    ]
  }, 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
