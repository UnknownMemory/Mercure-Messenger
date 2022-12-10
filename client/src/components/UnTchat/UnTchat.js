import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UnTchat = () => {
  const [message, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { id } = useParams();
  const { get, status, post } = useFetch();
  const token = Cookies.get("auth");

  const getAllMessages = async () => {
    const resMessages = await get(`/chat/${id}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setMessage(resMessages);
    }
  };

  const postMessage = async (e) => {
    e.preventDefault();
    const contenu = JSON.stringify({ messages: messageInput });
    const res = await post(`/chat/${id}/message`, contenu, {
      Authorization: token,
    });
  };

  const handleMessage = (e) => {
    document
      .querySelector("#lastMessage")
      .insertAdjacentHTML(
        "afterend",
        '<div class="alert alert-success w-75 mx-auto">My names is James Bond !</div>'
      );
    window.setTimeout(() => {
      const $alert = document.querySelector(".alert");
      $alert.parentNode.removeChild($alert);
    }, 2000);
    console.log(JSON.parse(e.data));
  };

  useEffect(() => {
    getAllMessages();
    const url = new URL("http://localhost:9090/.well-known/mercure");
    url.searchParams.append("topic", `/chat/${id}`);

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close();
    };
  }, []);

  const myMessages = message.map((message) => {
    return (
      <div key={message.id}>
        {message.contenu} {message.user.username}
      </div>
    );
  });

  return (
    <React.Fragment>
      <h1 className="d-flex justify-content-center">coucou</h1>
      <ListGroup className="text-center">{myMessages}</ListGroup>
      <div id="lastMessage"></div>

      <Form onSubmit={postMessage}>
        <Form.Group className="mt-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="messages"
            onChange={(e) => setMessageInput(e.currentTarget.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Envoyer
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default UnTchat;
