import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ExpoRoot } from 'expo-router';
import { theme } from './theme/theme';

export default function App() {
  const context = require.context('./app');

  return (
    <PaperProvider theme={theme}>
      <ExpoRoot context={context} />
    </PaperProvider>
  );
}