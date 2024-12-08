import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
      } else {
        setErrorMsg('Dostęp do kontaktów został odmówiony. Aplikacja nie może wyświetlić listy kontaktów.');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item.name || 'No Name'}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
});