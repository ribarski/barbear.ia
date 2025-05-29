import React, { createContext, useState, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from './api'; // Importe sua configuração do Axios ou o cliente HTTP que você usará

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // { id, name, email, role }
  const [isLoading, setIsLoading] = useState(true); // Começa true para verificar o token armazenado

  useEffect(() => {
    // Tenta carregar o token do usuário do SecureStore ao iniciar o app
    const bootstrapAsync = async () => {
      let token;
      let storedUserInfo;

      try {
        token = await SecureStore.getItemAsync('userToken');
        const userInfoString = await SecureStore.getItemAsync('userInfo');
        if (userInfoString) {
          storedUserInfo = JSON.parse(userInfoString);
        }

        // Aqui você poderia adicionar uma chamada à API para validar o token
        // e obter informações atualizadas do usuário se necessário.
        // Ex: if (token) { const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }); setUserInfo(data.user); }

      } catch (e) {
        console.error('Falha ao carregar o token/userInfo:', e);
        // Se der erro, é como se não tivesse token
      }

      // Após tentar carregar o token (e userInfo), atualizamos o estado.
      // Se o token existir, o usuário será considerado logado.
      if (token && storedUserInfo) {
        setUserToken(token);
        setUserInfo(storedUserInfo);
        // Configurar o token no cabeçalho padrão do Axios se estiver usando
        // if (api && api.defaults) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        setIsLoading(true);
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;
          setUserToken(token);
          setUserInfo(user);
          await SecureStore.setItemAsync('userToken', token);
          await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
        } catch (error) {
          console.error('Erro no signIn:', error);
          throw error;
        }
        setIsLoading(false);
      },
      signUp: async (name, email, password) => {
        setIsLoading(true);
        try {
          await api.post('/auth/register', { name, email, password });
        } catch (error) {
          console.error('Erro no signUp:', error);
          throw error;
        }
        setIsLoading(false);
      },
      signOut: async () => {
        setIsLoading(true);
        try {
          await SecureStore.deleteItemAsync('userToken');
          await SecureStore.deleteItemAsync('userInfo');
          // if (api && api.defaults) delete api.defaults.headers.common['Authorization'];
        } catch (e) {
          console.error('Falha ao remover o token/userInfo:', e);
        }
        setUserToken(null);
        setUserInfo(null);
        setIsLoading(false);
      },
      // Você pode adicionar googleSignIn aqui depois
      // googleSignIn: async (googleToken) => { ... },
      userToken,
      userInfo,
      isLoading,
      userRole: userInfo?.role, // Atalho para pegar o papel do usuário
    }),
    [userToken, userInfo, isLoading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};