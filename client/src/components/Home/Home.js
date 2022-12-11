import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import MesTchats from "../MesTchats/MesTchats";
import UserList from "../UserList/UserList";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UnTchat from "../UnTchat/UnTchat";

const Home = () => {
  const { id } = useParams();

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

  const isId = () => {
    if(id.isInteger() == id == 'home'){
      return true
    }
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <React.Fragment>
      <Row className="no-gutters h-100">
        <MesTchats/>
        {id == 'home' ? <UserList/> : <UnTchat id={id}/>}
      </Row>
    </React.Fragment>
  );
};

export default Home;
