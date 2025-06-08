import React, { createContext, useState, useContext } from 'react'; // Importar useContext
import api from './AppNavigator/api';

export const BarberContext = createContext(null);

export const useBarber = () => {
  const context = useContext(BarberContext);
  if (!context) {
    throw new Error('useBarber must be used within a BarberProvider');
  }
  return context;
};

export const BarberProvider = ({ children }) => {
  const [barbershops, setBarbershops] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchBarbersByShop = async (barbershopId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/model/${barbershopId}`);
      const data = response.data;
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