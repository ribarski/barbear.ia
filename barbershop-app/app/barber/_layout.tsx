import { Stack } from 'expo-router';
import BarbershopScreen from '../../screens/Barber/BarbershopScreen';
import BarberScreen from '../../screens/Barber/BarberScreen';

export default function BarberLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="barbershop" options={{ title: 'Barbershop' }} />
      <Stack.Screen name="barber" options={{ title: 'Barber' }} />
    </Stack>
  );
}
