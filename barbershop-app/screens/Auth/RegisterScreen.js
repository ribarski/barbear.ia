import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { AuthContext } from '../../navigation/AppNavigator/AuthProvider';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(name, email, password);
      router.push('/auth/login');
    } catch (e) {
      setError('Erro ao registrar. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Registrar</Text>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      {error ? <HelperText type="error">{error}</HelperText> : null}
      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Registrar
      </Button>
      <Button
      labelStyle={{color: '#00B2FF'}}
      onPress={() => router.push('/auth/login')}>
      Já tem conta? Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#1E1E1E' },
  title: { marginBottom: 24, textAlign: 'center', color: "#FFFFFF" },
  input: { marginBottom: 16 },
  button: { marginTop: 8 , backgroundColor: '#00B2FF' },
});
