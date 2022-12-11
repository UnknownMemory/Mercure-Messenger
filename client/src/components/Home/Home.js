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

  const isId = () => {
    if(id.isInteger() == id == 'home'){
      return true
    }
  }

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
