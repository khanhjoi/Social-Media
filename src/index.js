import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import App from './App';
import ErrorPage from './ErrorPage';
import Login from './components/Login'
import Register from './components/Register'
import './index.css';



// define router
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer 
      autoClose={3000}
    />
  </React.StrictMode>
);