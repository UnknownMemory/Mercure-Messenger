import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import "./MesTchats.css";

const MesTchats = () => {
  const [Chatnom, setChatNom] = useState([]);
  const { get, status } = useFetch();
  const [user, setUser] = useContext(UserContext);

  const getMyChat = async () => {
    const res = await get("/chat/mes-chats", null, {
      Authorization: user.token,
    });
    if (status.current.ok) {
      console.log(res);
      setChatNom(res);
    }
  };

  useEffect(() => {
    getMyChat();
  }, []);

  const chat = Chatnom.map((nameTchat) => {
    return <div key={nameTchat.id}>{nameTchat.nom}</div>;
  });

  return (
    <>
      <React.Fragment>
        <h1 className="d-flex justify-content-center">Mes tchats</h1>
        <ListGroup className="text-center">{chat}</ListGroup>
      </React.Fragment>
    </>
  );
};

export default MesTchats;
