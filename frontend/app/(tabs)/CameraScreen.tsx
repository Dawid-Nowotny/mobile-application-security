import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera'; 
import { CameraView } from 'expo-camera'; 

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
        Alert.alert(
          'Brak dostępu do kamery',
          'Nie przyznano uprawnienia do korzystania z kamery. Niektóre funkcje mogą być niedostępne.'
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text style={styles.text}>Sprawdzanie uprawnień...</Text>
      ) : hasPermission ? (
        <View style={styles.cameraView}>
          <CameraView style={{ flex: 1 }} />
        </View>
      ) : (
        <Text style={styles.text}>
          Dostęp do kamery został odmówiony. Nie można korzystać z funkcji kamery.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  cameraView: {
    flex: 1,
    width: '90%',
    height: '70%',
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
  },
});