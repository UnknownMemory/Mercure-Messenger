import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import {Col, Navbar, InputGroup, Button, Form, Card} from 'react-bootstrap';

import './UnTchat.css'
import Message from "../Message/Message";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const UnTchat = (props) => {
  const [room, setRoom] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { get, status, post } = useFetch();
  const token = Cookies.get("auth");

  const eventSource = useRef();

  const getAllMessages = async () => {
    const resMessages = await get(`/chat/${props.id}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setMessageList(resMessages.reverse());
    }
  };

  const getRoom = async () => {
    const res = await get(`/chat/${props.id}/info`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      setRoom(res);
    }
  };

  const postMessage = async (e) => {
    e.preventDefault();
    const msgJSON = JSON.stringify({ messages: messageInput });
    const response = await post(`/chat/${props.id}/message`, msgJSON, {Authorization: token});

    if(status.current.ok){
      setMessageInput("");
      setMessageList([...messageList, response]);
    }
  };

  useDocumentTitle(`WeTchat - ${room.nom}`);

  useEffect(() => {
    getAllMessages();
    getRoom();

    const url = new URL("http://localhost:9090/.well-known/mercure");
    url.searchParams.append("topic", `/chat/${props.id}`);

    eventSource.current = new EventSource(url, { withCredentials: true });

    return () => {
      eventSource.current.close();
    };
  }, [props.id]);


  useEffect(() => {
    if (!eventSource.current) {
      return;
    }

    eventSource.current.onmessage = (event) => {
      setMessageList([...messageList, JSON.parse(event.data)])
    }
  }, [messageList])

  const messages = messageList.map((message) => {
    return (
      <Message key={message.id} message={message} />
    );
  });

  return (
    <Col md="10" xs="12" className="d-flex flex-column bg h-100 p-0">
      <Navbar className="justify-content-between align-items-center">
          <Navbar.Brand className="d-sm-block px-3">{room.nom}</Navbar.Brand>
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
        <Form.Control type="text" aria-label="Message" value={messageInput} onChange={(e) => setMessageInput(e.currentTarget.value)}/>
        <Button onClick={postMessage}>Envoyer</Button>
      </InputGroup>
    </Col>
  );
};

export default UnTchat;
