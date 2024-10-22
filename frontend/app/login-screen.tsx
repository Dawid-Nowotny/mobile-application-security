import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Błąd', 'Nazwa użytkownika i hasło nie mogą być puste!');
            return;
        }

        if (/[^a-zA-Z0-9]/.test(username) || /[^a-zA-Z0-9]/.test(password)) {
            Alert.alert('Błąd', 'Nazwa użytkownika i hasło mogą zawierać tylko litery i cyfry!');
            return;
        }

        //const apiUrl = 'http://10.0.2.2:8000/user/login-vurnerable';
        const apiUrl = 'http://10.0.2.2:8000/user/login-secure';
        
        axios.post(apiUrl, {
            username,
            password,
        })
        .then(response => {
            console.log(response);
            if (response.data.username) {
                setLoggedInUser(response.data.username);
            } else {
                Alert.alert('Błąd', 'Nieprawidłowe dane logowania!');
            }
        })
        .catch(error => {
            const errorMessage = error.response && error.response.data && error.response.data.detail ? error.response.data.detail : 'Wystąpił nieoczekiwany błąd';
        
        console.log(errorMessage)
        Alert.alert('Błąd', errorMessage);
        });
    };

    return (
        <View style={styles.container}>
            {loggedInUser && (
                <Text style={styles.greeting}>Hello, {loggedInUser}!</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    greeting: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: 'green',
    },
});

export default LoginScreen;