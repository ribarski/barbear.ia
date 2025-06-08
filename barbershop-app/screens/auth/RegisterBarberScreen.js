import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../context/AuthProvider';
import { useBarber } from '../../context/BarberProvider';
import { useRouter } from 'expo-router';

export default function RegisterBarberScreen() {
  const router = useRouter();
  const { signUpBarber } = useAuth();
  const { barbershops, fetchBarbershops, loading: barberContextLoading, error: barberContextError } = useBarber();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [barbershopId, setBarbershopId] = useState('');
  
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchBarbershops();
  }, []);

  const handleRegister = async () => {
    if (!name || !cpf || !email || !phone || !password || !barbershopId) {
      setError('Preencha todos os campos.');
      return;
    }
    setFormLoading(true);
    setFormError('');
    try {
      await signUpBarber({ name, cpf, email, phone, password, barbershopId });
      router.push('/login');
    } catch (e) {
      setFormError('Erro ao registrar barbeiro. Verifique os dados.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Registrar como Barbeiro</Text>
      
      <TextInput label="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="CPF" value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput label="Telefone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      <TextInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={barbershopId}
          onValueChange={(itemValue) => setBarbershopId(itemValue)}
          enabled={!barberContextLoading && barbershops.length > 0}
        >
          <Picker.Item label={barberContextLoading ? "Carregando barbearias..." : "Selecione sua barbearia"} value="" />
          {barbershops.map((shop) => (
            <Picker.Item key={shop._id} label={shop.name} value={shop._id} />
          ))}
        </Picker>
      </View>

      {formError ? <HelperText type="error">{formError}</HelperText> : null}
      {barberContextError ? <HelperText type="error">{barberContextError}</HelperText> : null}
      
      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Registrar
      </Button>

      <Button mode="text" onPress={() => router.push('/auth/register')} >
        Sou um cliente
      </Button>
      
      <Button labelStyle={{color: '#13452C'}} onPress={() => router.push('/auth/login')} style={{marginTop: 8}}>
        Já tem conta? Entrar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
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
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#79747E',
  },
  button: { 
    marginTop: 8, 
    backgroundColor: '#13452C' 
  },
});