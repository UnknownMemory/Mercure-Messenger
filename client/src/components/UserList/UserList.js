import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import MesTchats from "../MesTchats/MesTchats";
import { Col } from "react-bootstrap";

const UserList = () => {
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

  const users = usersList.map((u) => {
    return (
      <div key={u.id} onClick={() => handleClick(u.id)}>
        {u.username}
      </div>
    );
  });

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Col md="10" xs="12" className="bg">
        <h3>Liste des utilisateurs</h3>
        <div id="msg">{users}</div>
    </Col>
  );
};

export default UserList;
