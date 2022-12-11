import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import {Col, Navbar, InputGroup, Button, Form, Card} from 'react-bootstrap';

import './UnTchat.css'
import Message from "../Message/Message";

const UnTchat = (props) => {
  const [messageList, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { get, status, post } = useFetch();
  const token = Cookies.get("auth");

  const getAllMessages = async () => {
    const resMessages = await get(`/chat/${props.id}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setMessage(resMessages);
    }
  };

  const postMessage = async (e) => {
    e.preventDefault();
    const contenu = JSON.stringify({ messages: messageInput });
    const res = await post(`/chat/${props.id}/message`, contenu, {
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
    url.searchParams.append("topic", `/chat/${props.id}`);

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close();
    };
  }, []);

  const messages = messageList.map((message) => {
    return (
      <Message message={message} />
    );
  });

  return (
    <Col md="10" xs="12" className="d-flex flex-column bg">
      <Navbar className="justify-content-between align-items-center">
          <Navbar.Brand className="d-sm-block">Test</Navbar.Brand>
          <div className="d-block d-sm-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                  />
              </svg>
          </div>
      </Navbar>
      <div className="messages">
        {messages}
      </div>
      <InputGroup className="p-3">
        <Form.Control aria-label="Message" />
        <Button bg="dark">Envoyer</Button>
      </InputGroup>
    </Col>
  );
};

export default UnTchat;
