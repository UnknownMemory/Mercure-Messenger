import {createContext, useState} from 'react';

export const UserContext = createContext('');
UserContext.displayName = 'UserContext';

export default function UserProvider(props) {
    const [user, setUser] = useState('');
    
    return (
        <UserContext.Provider value={[user, setUser, getUserInfo]}>
            {props.children}
        </UserContext.Provider>
    )
}