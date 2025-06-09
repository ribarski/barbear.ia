import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../context/AuthProvider';
import { useColorScheme } from '@/hooks/useColorScheme';

// Componente que lida com a lógica de redirecionamento
function RootLayoutNav() {
  const { user, role, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Espera o fim do carregamento da autenticação
    if (loading) {
      return;
    }

    const inAuthGroup = segments[0] === 'auth';

    // Se o usuário está logado, redirecione para a área correta
    if (user) {
      if (role === 'barber') {
        router.replace('/barber');
      } else {
        router.replace('/user');
      }
    } 
    // Se o usuário não está logado e não está na área de auth, redirecione para o login
    else if (!inAuthGroup) {
      router.replace('/auth/login');
    }
  }, [user, role, loading]);

  // Enquanto carrega a fonte ou a autenticação, não renderiza nada
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        
        <RootLayoutNav />
        
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" />
          <Stack.Screen name="user" />
          <Stack.Screen name="barber" />
          <Stack.Screen name="+not-found" />
        </Stack>
        
        <StatusBar style="auto" />

      </ThemeProvider>
    </AuthProvider>
  );
}