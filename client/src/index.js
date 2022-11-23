import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import './index.css';
import App from './App';
import Register from './components/Register/Register';
import reportWebVitals from './reportWebVitals';
import { isLoggedLoader } from './loaders/isLoggedLoader';


const router = createBrowserRouter([
  {
    path: "/",
    loader: isLoggedLoader,
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
