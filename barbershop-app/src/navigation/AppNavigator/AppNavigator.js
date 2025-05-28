// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';

import AuthNavigator from './AuthNavigator'; // Telas de Login/Cadastro
import ClientTabs from './ClientTabs'; // Navegação do Cliente
import BarberTabs from './BarberTabs'; // Navegação do Barbeiro
import LoadingScreen from '../screens/Common/LoadingScreen'; // Tela de carregamento

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { userToken, userRole, isLoading } = useContext(AuthContext); // Assumindo que seu AuthContext provê isso

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : userRole === 'client' ? (
          <Stack.Screen name="ClientApp" component={ClientTabs} />
        ) : userRole === 'barber' ? (
          <Stack.Screen name="BarberApp" component={BarberTabs} />
        ) : (
           // Fallback ou tela de seleção de papel se necessário após o primeiro login social
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}