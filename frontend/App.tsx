import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AuthProvider } from './src/context/AuthContext';

function MainApp() {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      {/* If authenticated, show the app otherwise, show the Register/Login Screen */}
      {token ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
