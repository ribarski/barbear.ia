import { Stack } from 'expo-router';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Registrar' }} />
      <Stack.Screen name="login-success" options={{ title: 'Sucesso' }} />
    </Stack>
  );
}
