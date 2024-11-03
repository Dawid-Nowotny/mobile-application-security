import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./index"

type UserData = {
  username: string;
  password: string;
  note: string;
};

export default function AsyncStorageScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [storedData, setStoredData] = useState<UserData | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const saveData = async () => {
    try {
      const data: UserData = { username, password, note };
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      alert('Dane zapisane w AsyncStorage!');
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        setStoredData(JSON.parse(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nazwa użytkownika" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Hasło" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Notatka" value={note} onChangeText={setNote} multiline style={[styles.input, { height: 100 }]} />
      <Button title="Zapisz" onPress={saveData} />
      <Button title="Pokaż dane" onPress={loadData} />
      
      {storedData && (
        <View style={styles.storedDataContainer}>
          <Text>Użytkownik: {storedData.username}</Text>
          <Text>Hasło: {storedData.password}</Text>
          <Text>Notatka: {storedData.note}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  storedDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});