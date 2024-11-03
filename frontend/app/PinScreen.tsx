import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type PinScreenProps = {
  onAuthenticated: () => void;
};

  export default function PinScreen({ onAuthenticated }: PinScreenProps) {
    const [pin, setPin] = useState('');
    const [isPinSet, setIsPinSet] = useState(false); 
    const [mode, setMode] = useState<'set' | 'verify'>('verify'); 
  
    useEffect(() => {
      // Sprawdź, czy PIN jest już ustawiony
      const checkPin = async () => {
        const storedPin = await SecureStore.getItemAsync('userPin');
        if (storedPin) {
          setIsPinSet(true);
          setMode('verify');
        } else {
          setMode('set');
        }
      };
      checkPin();
    }, []);
  
    const handleSetPin = async () => {
      await SecureStore.setItemAsync('userPin', pin);
      Alert.alert('PIN zapisany', 'PIN został ustawiony pomyślnie.');
      setIsPinSet(true);
      setMode('verify');
      setPin('');
    };
  
    const handleVerifyPin = async () => {
      const storedPin = await SecureStore.getItemAsync('userPin');
      if (storedPin === pin) {
        onAuthenticated(); 
      } else {
        Alert.alert('Błędny PIN', 'Spróbuj ponownie');
        setPin('');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>{mode === 'set' ? 'Ustaw swój PIN' : 'Wpisz PIN, aby kontynuować'}</Text>
        <TextInput
          placeholder="PIN"
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          style={styles.input}
          keyboardType="numeric"
        />
        <Button
          title={mode === 'set' ? 'Zapisz PIN' : 'Zatwierdź'}
          onPress={mode === 'set' ? handleSetPin : handleVerifyPin}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    input: {
      borderBottomWidth: 1,
      marginBottom: 10,
      padding: 8,
      borderRadius: 5,
    },
  });