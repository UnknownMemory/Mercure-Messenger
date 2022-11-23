import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useFetch from "../../hooks/useFetch";
import "./register.css"

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {post, status} = useFetch()

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await post('http://localhost:1234/api/inscription',  JSON.stringify({'username': username, 'password': password}));
  
    }

    return (
        <Form onSubmit={onSubmit} id="formulaire">
            <Form.Group classname="mt-3">
                <Form.Label>Username</Form.Label>   
                <Form.Control type="text" name="username" onChange={(e) => setUsername(e.currentTarget.value)} />
            </Form.Group>
            <Form.Group classname="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
            </Form.Group>
            <div className="mt-3 mb-3">
                <Button variant="primary" type="submit">S'inscrire</Button>
            </div>
        </Form>
    );
}



export default Register;
