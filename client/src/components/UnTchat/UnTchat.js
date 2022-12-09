import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UnTchat = () => {
  const [Chatnom, setChatNom] = useState([]);
  const [message, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { id } = useParams();
  const { get, status } = useFetch();
  const [user, setUser] = useContext(UserContext);
  const token = Cookies.get("auth");

  const getAllMessages = async () => {
    const res = await get(`/chat/${id}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setMessage(res);
      console.log(message);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const myMessages = message.map((message) => {
    return (
      <>
        <div key={message.id}>
          {message.contenu} {message.user.username}
        </div>
      </>
    );
  });

  return (
    <>
      <React.Fragment>
        <h1 className="d-flex justify-content-center">coucou</h1>
        <ListGroup className="text-center">{myMessages}</ListGroup>
      </React.Fragment>
    </>
  );
};

export default UnTchat;
