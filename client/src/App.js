import { useContext } from "react";
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
import { UserContext } from "./contexts/UserContext";
import useFetch from "./hooks/useFetch";
import AllTchats from "./components/AllTchats/AllTchats";
import UnTchat from "./components/UnTchat/UnTchat";
import ErrorPage from "./components/ErrorPage/ErrorPage"

function App() {
  const [user, setUser] = useContext(UserContext);
  const { post, status } = useFetch();

  const isNotLoggedLoader = async () => {
    if (!Cookies.get("auth")) {
      return redirect("/login");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/wetchat/:id",
      loader: isNotLoggedLoader,
      element: <Home />,
      errorElement: <ErrorPage />
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
    {
      path: "/all-tchats",
      element: <AllTchats />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
