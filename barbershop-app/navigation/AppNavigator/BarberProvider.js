import React, { createContext, useState } from 'react';
import api from './api';

export const BarberContext = createContext(null);

export const BarberProvider = ({ children }) => {
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]); // Armazena a lista de barbeiros da loja selecionada
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBarbershops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/model/barbershops');
      const data = await response.json();
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
    setBarbers([]); // Limpa a lista anterior antes de buscar uma nova
    try {
      const response = await api.get(`/model/${barbershopId}`);
      const data = await response.json();
      setBarbers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BarberContext.Provider
      value={{
        barbershops,
        barbers,
        loading,
        error,
        fetchBarbershops,
        fetchBarbersByShop,
      }}
    >
      {children}
    </BarberContext.Provider>
  );
};