import React, { useContext, useEffect, useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { BsArrowBarRight } from "react-icons/bs";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";

import "./UserInfo.css";
import {UserContext} from "../../contexts/UserContext";

const UserInfo = () => {
    const [user, setUser, getUserInfo] = useContext(UserContext);

    const logout = () => {
        Cookies.remove("auth");
        window.location.href = "/login";
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="user-profile">
            <div className="username">{user.username}</div>
            <div className="options">
                <OverlayTrigger placement="top" overlay={<Tooltip>Déconnexion</Tooltip>}>
                    <Button onClick={logout}><BsArrowBarRight size={18} /></Button>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export default UserInfo;
