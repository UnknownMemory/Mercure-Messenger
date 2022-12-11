import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./MesTchats.css";
import { Col } from "react-bootstrap";

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

    if (status.current.ok) {
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
      <Col md="2" xs="9" className="liste h-100">
        <h3 className="d-flex justify-content-start ml-1">Conversations</h3>
        <ListGroup className="d-flex justify-content-center text-start">
          {chat}
        </ListGroup>
      </Col>
    </>
  );
};

export default MesTchats;
