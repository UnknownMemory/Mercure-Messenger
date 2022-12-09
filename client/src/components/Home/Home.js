import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";

const Home = () => {
  const [usersList, setUsersList] = useState([]);
  const { get, post, status } = useFetch();
  const [user, setUser] = useContext(UserContext);
  const token = Cookies.get("auth");

  const getUsersList = async () => {
    const res = await get("/users", null, { Authorization: token });

    if (status.current.ok) {
      setUsersList(res.users);
    }
  };

  const handleClick = async (userId) => {
    const response = await post(`/ping/${userId}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      console.log(response);
    }
  };

  const users = usersList.map((u) => {
    return (
      <div key={u.id} onClick={() => handleClick(u.id)}>
        {u.username}
      </div>
    );
  });

  const handleMessage = (e) => {
    document
      .querySelector("#msg")
      .insertAdjacentHTML(
        "afterend",
        '<div class="alert alert-success w-75 mx-auto">Ping !</div>'
      );
    window.setTimeout(() => {
      const $alert = document.querySelector(".alert");
      $alert.parentNode.removeChild($alert);
    }, 2000);
    console.log(JSON.parse(e.data));
  };

  useEffect(() => {
    getUsersList();

    const url = new URL("http://localhost:9090/.well-known/mercure");
    url.searchParams.append("topic", "http://example.com/ping");

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <React.Fragment>
      <div id="msg"></div>
      {users}
    </React.Fragment>
  );
};

export default Home;
