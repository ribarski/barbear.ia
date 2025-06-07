import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Exemplo de ícones

export default function UserTabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, // Oculta o cabeçalho se você tiver um customizado
      tabBarActiveTintColor: '#C77DFF', // Cor da aba ativa
      tabBarInactiveTintColor: '#AAA',  // Cor da aba inativa
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      {/* EXEMPLO DE NOVA ROTA 
      <Tabs.Screen
        name="schedules"
        options={{
          title: 'Meus Horários',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      */}
    </Tabs>
  );
}