import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './navigation/AppNavigator/AuthProvider'; 
import { AppNavigator } from './navigation/AppNavigator/AppNavigator';
import { theme } from './theme/theme'; 

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}