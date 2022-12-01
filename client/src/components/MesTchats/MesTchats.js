import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';


import "./MesTchats.css"


const MesTchats = () => {
    const [nom, setNom] = useState(['pomme', 'poire'])


    const listTchat = nom.map((nameTchat, i) => {
        console.log(nameTchat);
        return (
            <ListGroup.Item key={i}>{nameTchat}</ListGroup.Item>
        );
    });



    return (
        <React.Fragment>
            <h1 className="d-flex justify-content-center">Mes tchats</h1>
            <ListGroup>
                {listTchat}
            </ListGroup>

        </React.Fragment>
    );
}

export default MesTchats;