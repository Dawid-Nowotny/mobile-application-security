import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const App = () => {
  const [note, setNote] = useState('');
  const apiKey = '12345-ABCDE-67890-FGHIJ';
  console.log('Klucz API:', apiKey);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notatnik</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz swoją notatkę"
        value={note}
        onChangeText={setNote}
      />
      {/* <Text style={styles.apiKey}>Klucz API: {apiKey}</Text> */}
      <Button title="Zapisz Notatkę" onPress={() => alert('Notatka zapisana!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  apiKey: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray',
  },
});

export default App;