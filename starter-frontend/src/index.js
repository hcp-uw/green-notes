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
import Login from './pages/auth-pages/login'
import Register from './pages/auth-pages/register'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <HomeScreen />},
      {
        path: "about-us",
        element: <AboutUs />,
      }, 
      {
        path: "collaboration",
        element: <Collaboration />,
      }, 
      {
        path: "note",
        // Later change to
        // path: "note/:noteId",
        element: <Note />,
      }, 
      {
        //Later change to
        //path: "notes/:folderId",
        path: "notes",
        element: <Notes />,
      }, 
      {
        path: "profile",
        // Later change to
        // path: "profile/:profileId", 
        element: <Profile />,
      }, 
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
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
