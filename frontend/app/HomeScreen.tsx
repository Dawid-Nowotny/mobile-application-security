import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './index';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Button
        title="Przejdź do AsyncStorageScreen"
        onPress={() => navigation.navigate('AsyncStorageScreen')}
      />
      <Button
        title="Przejdź do SecureStoreScreen"
        onPress={() => navigation.navigate('SecureStoreScreen')}
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
});