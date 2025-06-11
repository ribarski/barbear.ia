import { Stack } from 'expo-router';
import React from 'react';

// Este é um layout de "Pilha" (Stack).
// Ele simplesmente diz: "As telas dentro da pasta /user
// serão navegadas como uma pilha".
export default function BarberStackLayout() {
  return (
    <Stack>
      {/* A tela principal da área do usuário. Ocultamos o cabeçalho dela. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* As outras telas da pilha. Elas terão um cabeçalho com título e botão de voltar. */}
      <Stack.Screen 
        name="barber" 
        options={{ 
          title: 'Barbeiros',
          headerShown: true, // Garante que o cabeçalho com o botão "voltar" apareça
        }} 
      />
      <Stack.Screen 
        name="barbershop" 
        options={{ 
          title: 'Barbearias',
          headerShown: true,
        }} 
      />
      {/* Adicione outras telas do usuário aqui, se necessário */}
    </Stack>
  );
}