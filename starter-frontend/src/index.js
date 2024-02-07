import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page";
// import "./App.css";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <ErrorPage />, 
  }, 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
