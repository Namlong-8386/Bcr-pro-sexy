import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type User = {
  id: string;
  name: string;
  username: string;
  balance: number;
  plan: 'free' | 'premium' | 'vip';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password?: string) => Promise<any>;
  register: (username: string, password?: string) => Promise<any>;
  logout: () => Promise<void>;
  updateBalance: (amount: number) => void;
  upgradePlan: (plan: User['plan']) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile on initial load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUsername = localStorage.getItem('auth_username');
        if (!storedUsername) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/v1/user/profile?username=${storedUsername}`);
        const result = await response.json();
        if (result.success) {
          setUser({
            ...result.data,
            name: result.data.username // mapping for consistency
          });
        } else {
          localStorage.removeItem('auth_username');
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = useCallback(async (username: string, password?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('auth_username', result.data.username);
        setUser({
          ...result.data,
          name: result.data.username
        });
        return result;
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login detail error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, password?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('auth_username', result.data.username);
        setUser({
          ...result.data,
          name: result.data.username
        });
        return result;
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Register detail error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
      localStorage.removeItem('auth_username');
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }, []);

  const updateBalance = (amount: number) => {
    setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
  };

  const upgradePlan = (plan: User['plan']) => {
    setUser(prev => prev ? { ...prev, plan } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateBalance, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
