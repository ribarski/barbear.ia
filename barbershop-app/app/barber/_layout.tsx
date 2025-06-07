import { Stack } from 'expo-router';
import BarberScreen from '../../screens/Barber/BarberScreen';

export default function BarberLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="barber" options={{ title: 'Barber' }} />
    </Stack>
  );
}
