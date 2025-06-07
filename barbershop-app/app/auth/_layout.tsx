import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Registrar' }} />
      <Stack.Screen name="register-barber" options={{ title: 'Registrar Barbeiro' }} />
    </Stack>
  );
}
