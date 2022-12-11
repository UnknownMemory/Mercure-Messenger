import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./MesTchats.css";

const MesTchats = () => {
  const [Chatnom, setChatNom] = useState([]);
  const { get, status } = useFetch();
  const [user, setUser] = useContext(UserContext);
  const token = Cookies.get("auth");
  const navigate = useNavigate();

  const getMyChat = async () => {
    const res = await get("/chat/mes-chats", null, {
      Authorization: token,
    });
    console.log(token);
    if (status.current.ok) {
      console.log(res);
      setChatNom(res);
    }
  };

  const handleClick = async (idChat) => {
    navigate(`/tchat/${idChat}`);
  };

  useEffect(() => {
    getMyChat();
  }, []);

  const chat = Chatnom.map((nameTchat) => {
    return (
      <div onClick={() => handleClick(nameTchat.id)} key={nameTchat.id}>
        {nameTchat.nom}
      </div>
    );
  });

  return (
    <>
      <React.Fragment>
      <div className="liste">
        <h1 className="d-flex justify-content-start h1-color-white">Mes tchats</h1>
        <ListGroup className="text-start">
          {chat}
        </ListGroup>
      </div>
      </React.Fragment>
    </>
  );
};

export default MesTchats;
