import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

import "./App.css";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage"
import { isNotLoggedLoader } from "./loaders/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      loader: isNotLoggedLoader,
      element: <ErrorPage />, 
    },
    {
      path: "/wetchat/:id",
      element: <Home />,
      loader: isNotLoggedLoader,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      loader: isNotLoggedLoader,
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      loader: isNotLoggedLoader,
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
