import { createContext, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../services/authApi';

interface IUser {
  id: number;
  username: string;
  password: string;
}

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  login(username: string, password: string): Promise<void>;
  register(username: string, password: string): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Register
  async function register(username: string, password: string) {
    const data = await registerUser(username, password);
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem('token', data.token);
  }

  // Login
  async function login(username: string, password: string) {
    const data = await loginUser(username, password);
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem('token', data.token);
  }

  // Logout
  async function logout() {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
