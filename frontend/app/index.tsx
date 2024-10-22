import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './login-screen';


export default function App() {
    return (
        <View style={styles.container}>
            <LoginScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});