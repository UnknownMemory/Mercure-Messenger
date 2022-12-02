import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";


const Home = () => {
    const [usersList, setUsersList] = useState([])
    const {get, status} = useFetch()
    const [user, setUser] = useContext(UserContext)

    const getUsersList = async () => {
        const res = await get('/users', null, {'Authorization': user})
        
        if(status.current.ok){
            setUsersList(res.users)
        }
    }

    const users = usersList.map(u => {
        return(<div key={u.id}>{u.username}</div>)
    })

    useEffect(() => {
        getUsersList();
    }, [])

    return (
        <React.Fragment>
            {users}
        </React.Fragment>
    );
}

export default Home;