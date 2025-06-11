import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth(); // Função do seu AuthContext

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (e) {
      setError('Falha no login. Verifique suas credenciais.');
      setLoading(false);
    }
    // setLoading(false) será tratado no signIn se houver navegação
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>
      <Button 
      labelStyle={{color: '#13452C'}}
      onPress={() => router.push('/auth/register')}>
        Não tem uma conta? Cadastre-se
      </Button>
      {/* Botão de Login com Google aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#FFEECC",
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#13452C'
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 10,
    color: '#FFFFFF',
    backgroundColor: "#13452C",
    borderRadius: 10
  }
});