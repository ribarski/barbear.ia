import React, { createContext, useState, useContext, useEffect } from 'react';

// CHECAR ESSE COMENTÁRIO DO GEMINI PORQUE PROVAVELMENTE NÃO TEM FUNÇÃO
//
// Supondo que você tenha uma função para verificar a sessão do usuário
import { checkUserSession } from './auth-service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao iniciar o app, verifica se há uma sessão ativa
    checkUserSession().then(({ user, role }) => {
      if (user) {
        setUser(user);
        setRole(role);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const value = {
    user,
    role,
    loading,
    signIn: (userData, userRole) => {
      setUser(userData);
      setRole(userRole);
    },
    signOut: () => {
      setUser(null);
      setRole(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};