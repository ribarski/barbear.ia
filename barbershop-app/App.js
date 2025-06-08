import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ExpoRoot } from 'expo-router';
import { theme } from './theme/theme';

// Com o Expo Router, o App.js se torna o local para configurar "Providers" globais.
// O roteamento em si é gerenciado pela estrutura de pastas 'app'.

export default function App() {
  // A propriedade 'context' informa ao Expo Router onde encontrar o diretório de rotas.
  const context = require.context('./app');

  return (
    // O PaperProvider é um provider global de tema, então é correto mantê-lo aqui,
    // envolvendo toda a aplicação.
    <PaperProvider theme={theme}>
      {/*
        ExpoRoot é o componente mágico do Expo Router que lê sua estrutura de
        pastas e renderiza a navegação correta.
      */}
      <ExpoRoot context={context} />
    </PaperProvider>
  );
}