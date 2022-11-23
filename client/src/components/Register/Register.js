import { useState } from "react";

import useFetch from "../../hooks/useFetch";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {post, status} = useFetch()

    const onSubmit = async (e) => {
        e.preventDefault();

        // const formdata = new FormData();
        // formdata.append('username', username);
        // formdata.append('password', password);

        const response = await post('http://localhost:1234/api/inscription',  JSON.stringify({'username': username, 'password': password}));

        if (status.current.ok) {
            console.log(response)
        }
    }

    return (
        <form method="post" onSubmit={onSubmit}>
            <input type="text" name="username" onChange={(e) => setUsername(e.currentTarget.value)} />
            <input type="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default Register;
