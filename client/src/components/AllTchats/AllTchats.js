import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';


import "./AllTchats.css"
import Button from "react-bootstrap/Button";


const AllTchats = () => {
    const [nom, setNom] = useState(['fraise', 'framboise'])


    const listTchat = nom.map((nameTchat, i) => {
        console.log(nameTchat);
        return (
            <ListGroup.Item key={i}>{nameTchat}
                <div className="margin-left">
                    <Button className="mb-3" variant="primary">Rejoindre</Button>
                </div>
            </ListGroup.Item>
        );
    });



    return (
        <React.Fragment>
            <h1 className="d-flex justify-content-center">Tous les Tchats</h1>
            <ListGroup>
                {listTchat}
            </ListGroup>

        </React.Fragment>
    );
}

export default AllTchats;