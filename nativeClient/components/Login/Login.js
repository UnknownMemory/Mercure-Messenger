import React, {useState, useContext} from "react";
import { SafeAreaView, View, TextInput, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../contexts/UserContext";

import useFetch from '../../hooks/useFetch'
import styles from './Login.style.js'

const Login = () => {
    const [username, onChangeUsername] = useState(null);
    const [password, onChangePassword] = useState(null);

    const {post, status} = useFetch();
    const [user, setUser] = useContext(UserContext)

    const onPress = async () => {
        const body = JSON.stringify({'username': username, 'password': password});
        const headers = {'Content-Type': 'application/json'}
        
        const response = await post('/login', body, headers);
        if(status.current.ok){
            setUser({username: username});
            // Cookies.set('auth', response.token, {expires: 5, domain: 'localhost'});
            console.log(response)
        }
  
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.form}>
            <TextInput style={styles.formInput} 
                       onChangeText={onChangeUsername}
                       placeholder="Nom d'utilisateur"
                       placeholderTextColor="#999993"
                       textContentType="username">
            </TextInput>
            <TextInput style={styles.formInput}
                       secureTextEntry
                       onChangeText={onChangePassword}
                       placeholder="Mot de passe"
                       placeholderTextColor="#999993">
            </TextInput>
             
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.txt}>Connexion</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default Login;