// src/screens/Auth/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
// import api from '../../api'; // Sua configuração do Axios

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useContext(AuthContext); // Função do seu AuthContext

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Exemplo de chamada à API (você implementará a lógica no AuthContext ou diretamente)
      // const response = await api.post('/auth/login', { email, password });
      // await signIn(response.data.token, response.data.user.role);
      await signIn(email, password); // Simplificado para o exemplo
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
        onPress={() => navigation.navigate('Signup')}
        style={styles.button}
      >
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
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});