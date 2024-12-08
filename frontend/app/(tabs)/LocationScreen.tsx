import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Dostęp do lokalizacji został odmówiony. Aplikacja nie może wyświetlić mapy.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
          />
        </MapView>
      ) : (
        <Text style={styles.text}>Czekam na lokalizację...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  text: { fontSize: 18, textAlign: 'center', margin: 10 },
});