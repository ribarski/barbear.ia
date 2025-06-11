import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const { barbershops, fetchBarbershops, signUp } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBarber, setIsBarber] = useState(false);
  const [barbershopId, setBarbershopId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBarbershops();
  }, []);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !isBarber) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(name, phone, email, password, isBarber, barbershopId);
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
        label="Celular"
        value={phone}
        onChangeText={setPhone}
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
      <Checkbox.Item
        label="Sou um barbeiro"
        status={isBarber ? true : false}
        onPress={() => {
          setIsBarber(!isBarber);
        }}
        style={styles.checkboxItem}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={barbershopId}
          onValueChange={(itemValue) => setBarbershopId(itemValue)}
          enabled={!formLoading && barbershops.length > 0 && isBarber}
        >
          <Picker.Item label={formLoading ? "Carregando barbearias..." : "Selecione sua barbearia"} value="" />
          {barbershops.map((shop) => (
            <Picker.Item key={shop._id} label={shop.name} value={shop._id} />
          ))}
        </Picker>
      </View>
      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Registrar
      </Button>
      <Button
        labelStyle={{color: '#13452C'}}
        onPress={() => router.push('/auth/login')}
      >
        Já tem conta? Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#FFEECC' 
  },
  title: { 
    marginBottom: 24, 
    textAlign: 'center',
    color: "#13452C" 
  },
  input: { 
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: { 
    marginTop: 8, 
    backgroundColor: '#13452C' 
  },
  linkButton: {
    marginBottom: 4,
  },
  checkboxItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
});
