import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'cliente' | 'vendedor' | 'admin';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  telefone?: string;
  empresa?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários mockados
const MOCK_USERS = [
  { id: '1', nome: 'Cliente Teste', email: 'cliente@prestigecvisual.com.br', senha: '123456', role: 'cliente' as UserRole, telefone: '(11) 99999-9999' },
  { id: '2', nome: 'Vendedor Prestige', email: 'vendedor@prestigecvisual.com.br', senha: '123456', role: 'vendedor' as UserRole, telefone: '(11) 98888-8888' },
  { id: '3', nome: 'Administrador', email: 'admin@prestigecvisual.com.br', senha: '123456', role: 'admin' as UserRole, telefone: '(11) 97777-7777' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{ user: User | null; isAuthenticated: boolean; isLoading: boolean }>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('prestige_user');
    if (storedUser) {
      setState({ user: JSON.parse(storedUser), isAuthenticated: true, isLoading: false });
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    const user = MOCK_USERS.find(u => u.email === email && u.senha === senha);
    if (user) {
      const { senha: _, ...userWithoutPassword } = user;
      localStorage.setItem('prestige_user', JSON.stringify(userWithoutPassword));
      setState({ user: userWithoutPassword, isAuthenticated: true, isLoading: false });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('prestige_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};