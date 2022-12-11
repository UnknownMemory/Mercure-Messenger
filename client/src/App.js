import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import MesTchats from "./components/MesTchats/MesTchats";

import "./App.css";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage"

function App() {

  const isNotLoggedLoader = async () => {
    // if (!Cookies.get("auth")) {
    //   return redirect("/login");
    // };
  };

  const router = createBrowserRouter([
    {
      path: "/",
      loader: isNotLoggedLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/wetchat/:id",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/mes-tchats",
          element: <MesTchats />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
