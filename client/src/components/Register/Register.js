import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useFetch from "../../hooks/useFetch";
import "./register.css"
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {post, status} = useFetch();

    useDocumentTitle('WeTchat - Inscription');

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await post('/register',  JSON.stringify({'username': username, 'password': password}));

        if(status.current.ok){
            console.log(response)
        }
    }

    return (
        <React.Fragment>
            <h1 className="d-flex justify-content-center">Inscription</h1>
            <Form onSubmit={onSubmit} id="formulaire">
                <Form.Group className="mt-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" name="username" onChange={(e) => setUsername(e.currentTarget.value)} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
                </Form.Group>
                <div className="mt-3 mb-3">
                    <Button variant="primary" type="submit">S'inscrire</Button>
                </div>
            </Form>
        </React.Fragment>
    );
}



export default Register;
