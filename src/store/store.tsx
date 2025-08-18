"use client";

import React, {createContext, useState, useContext, ReactNode} from 'react';
import AuthService from '@/services/AuthService';
import {IUser} from '@/models/Iuser';
import {AuthResponse} from "@/models/response/AuthResponse";

const BASE_URL = process.env.BASE_URL;


interface AuthContextType {
  user: IUser | null;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  registration: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      console.log(`login ${response}`);
      localStorage.setItem('token', response.accessToken);
      setUser(response.user);
      setIsAuth(true);
    } catch (e: any) {
      console.log(e);
    }
  };

  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(`reg ${response}`);

      localStorage.setItem('token', response.accessToken);
      setUser(response.user);
      setIsAuth(true);
    } catch (e: any) {
      console.log(e || 'Registration error');
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsAuth(false);
    } catch (e: any) {
      console.log(e.response?.message || 'Logout error');
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: AuthResponse = await res.json();

      console.log(data);

      localStorage.setItem('token', data.accessToken);
      setUser(data.user);
      setIsAuth(true);
    } catch (e: any) {
      console.log(e);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{user, isAuth, login, registration, logout, checkAuth, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
