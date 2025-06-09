import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [barbershops, setBarbershops] = useState([]);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        // 1. Tenta pegar o token salvo no armazenamento do dispositivo
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          // 2. Se achou um token, define ele como padrão para todas as futuras requisições da API
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // 3. Valida o token com a API para buscar os dados do usuário atual
          //    (Crie uma rota como /auth/me ou /users/profile no seu backend para isso)
          const response = await api.get('/auth/profile'); 
          const userData = response.data; // Assumindo que a resposta contém { user: {...}, role: '...' }
          
          if (userData) {
            setUser(userData.user);
            setRole(userData.role);
          }
        }
      } catch (error) {
        // Se o token for inválido ou ocorrer outro erro, apenas não faz nada.
        // O usuário continuará deslogado.
        console.error("Falha ao carregar sessão:", error);
      } finally {
        // 4. Finaliza o carregamento inicial
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    // A função de login agora faz a chamada à API E gerencia o token
    const response = await api.post('/auth/login', { email, password });
    const { user, role, token } = response.data;

    // Salva o token no AsyncStorage para persistir a sessão
    await AsyncStorage.setItem('userToken', token);
    
    // Define o token no header do 'api' para as próximas requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Atualiza o estado do contexto
    setUser(user);
    setRole(role);
  };

  const signOut = async () => {
    // Limpa tudo relacionado à sessão
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setRole(null);
  };

  // Funções de registro que apenas chamam a API, mas não logam o usuário
  const signUp = async (name, email, password) => {
    return api.post('/auth/register', { name, email, password });
  };
  
  const signUpBarber = async (name, cpf, email, phone, password, barbershopId) => {
    return api.post('/auth/register-barber', { name, cpf, email, phone, password, barbershopId });
  };

  const fetchBarbershops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/model/barbershops');
      const data = response.data;
      setBarbershops(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    role,
    loading,
    error,
    barbershops,
    signIn,
    signOut,
    signUp,
    signUpBarber,
    fetchBarbershops
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}