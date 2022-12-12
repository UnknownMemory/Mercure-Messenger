import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css"
import Spinner from 'react-bootstrap/Spinner';
import useDocumentTitle from "../../hooks/useDocumentTitle";


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();

    const {post, status, error, isLoading} = useFetch()

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({'username': username, 'password': password});
        const headers = {'Content-Type': 'application/json'}
        
        const response = await post('/login', body, headers);

        if(status.current.ok){
            setUser({username: username});
            Cookies.set('auth', response.token, {expires: 5, domain: 'localhost'});
        }
  
    }

    useDocumentTitle('WeTchat - Connexion');

    useEffect(() => {
        if(Cookies.get('auth')){
            return navigate('/');
        }
    }, [user])

    return (
        <div>
            <h1 className="d-flex justify-content-center">Se connecter</h1>
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
                    <Button variant="primary" type="submit">Connexion</Button>
                </div>
            </Form>
           <div className="d-flex justify-content-center h5">{isLoading && <Spinner/>}</div>
        </div>

    );
}



export default Login;
