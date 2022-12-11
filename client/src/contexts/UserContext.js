import { createContext, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext("");
UserContext.displayName = "UserContext";

export default function UserProvider(props) {
  const [user, setUser] = useState("");
  const { get, status } = useFetch();

  const token = Cookies.get("auth");

  const getUserInfo = async () => {
    const res = await get("/user/info", null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setUser(res);
    }
  };

  return (
    <UserContext.Provider value={[user, setUser, getUserInfo]}>
      {props.children}
    </UserContext.Provider>
  );
}
