import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type PinScreenProps = {
  onAuthenticated: () => void;
};

export default function PinScreen({ onAuthenticated }: PinScreenProps) {
  const [pin, setPin] = useState('');

  const handleVerifyPin = async () => {
    try {
      const storedPin = await SecureStore.getItemAsync('userPin');
      
      if (storedPin === pin) {
        onAuthenticated(); 
      } else {
        Alert.alert('Błędny PIN', 'Spróbuj ponownie');
        setPin('');
      }
    } catch (error) {
      console.error('Błąd podczas weryfikacji PIN-u:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Wprowadź PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Potwierdź" onPress={handleVerifyPin} />
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
    marginBottom: 20,
    padding: 8,
    borderRadius: 5,
  },
});