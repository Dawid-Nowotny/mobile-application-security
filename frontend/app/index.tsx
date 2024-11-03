import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageScreen from './AsyncStorageScreen';
import SecureStoreScreen from './SecureStoreScreen';
import HomeScreen from './HomeScreen';
import PinScreen from './PinScreen';

export type RootStackParamList = {
  PinScreen: undefined;
  HomeScreen: undefined;
  AsyncStorageScreen: undefined;
  SecureStoreScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={isAuthenticated ? "HomeScreen" : "PinScreen"}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="PinScreen"
            options={{ title: 'Wprowadź PIN' }}
          >
            {props => <PinScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Wybierz opcję przechowywania danych' }}
            />
            <Stack.Screen
              name="AsyncStorageScreen"
              component={AsyncStorageScreen}
              options={{ title: 'Wersja 1: AsyncStorage' }}
            />
            <Stack.Screen
              name="SecureStoreScreen"
              component={SecureStoreScreen}
              options={{ title: 'Wersja 2: SecureStore' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
