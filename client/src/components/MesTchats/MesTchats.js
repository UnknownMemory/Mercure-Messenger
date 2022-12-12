import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./MesTchats.css";
import { Col, Navbar } from "react-bootstrap";
import UserInfo from "../UserInfo/UserInfo";

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
    navigate(`/wetchat/${idChat}`);
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
        <Navbar>
          <Navbar.Brand className="d-sm-block px-3">Conversations</Navbar.Brand>
        </Navbar>
        <div className="list-top">
          <Link to="/wetchat/home" className="list-link">Listes des utilisateurs</Link>
          <ListGroup className="d-flex text-start">
            {chat}
          </ListGroup>
        </div>
        <UserInfo/>
      </Col>
    </>
  );
};

export default MesTchats;
