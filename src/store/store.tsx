"use client";

import React, {createContext, useState, useContext, ReactNode} from 'react';
import AuthService from '@/services/authService';
import { IUser } from '@/models/Iuser';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface AuthContextType {
  user: IUser | null;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  registration: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      Cookies.set('token', response.accessToken, {
        path: '/',
        expires: 15,
      });
      setUser(response.user);
      setIsAuth(true);
      router.push("/");
    } catch (e: any) {
      throw e;
    }
  };

  const registration = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await AuthService.registration(email, password, firstName, lastName);
    } catch (e: any) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      Cookies.remove('token');
      setUser(null);
      setIsAuth(false);
      router.push("/auth/login");
    } catch (e: any) {
      console.log(e.response?.message || 'Logout error');
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        throw new Error('No token found in localStorage');
      }

      const res = await fetch(`${BASE_URL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

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
