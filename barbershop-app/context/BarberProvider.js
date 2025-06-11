import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const BarberContext = createContext(null);

export const useBarber = () => {
  const context = useContext(BarberContext);
  if (!context) {
    throw new Error('useBarber must be used within an BarberProvider');
  }
  return context;
};

export function BarberProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);

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

  const fetchBarbershops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/barbershops');
      const data = response.data;
      setBarbershops(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBarbersByShop = async (barbershopId) => {
    setLoading(true);
    setError(null);
    setBarbers([]);
    try {
      const response = await api.get(`/barbers/${barbershopId}`);
      const data = response.data;
      setBarbers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBarbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/barbers');
      const data = response.data;
      setBarbers(data);
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
    barbers,
    fetchBarbershops,
    fetchBarbersByShop,
    fetchBarbers
  };

  return <BarberContext.Provider value={value}>{children}</BarberContext.Provider>;
}