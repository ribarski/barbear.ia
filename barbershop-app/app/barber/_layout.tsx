import { Stack } from 'expo-router';

export default function BarberLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="barber" options={{ title: 'Barber' }} />
    </Stack>
  );
}
