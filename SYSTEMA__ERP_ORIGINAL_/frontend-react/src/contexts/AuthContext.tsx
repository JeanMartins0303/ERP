import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import api from '../services/api';

interface AuthContextData {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Verifica se há um token válido ao iniciar a aplicação
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(response => {
          dispatch(loginSuccess({
            user: response.data,
            token,
            expiresIn: 3600 // 1 hora
          }));
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());
      const response = await api.post('/auth/login', { email, password });
      const { user, token, expiresIn } = response.data;
      
      dispatch(loginSuccess({ user, token, expiresIn }));
      navigate('/dashboard');
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || 'Erro ao fazer login'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const clearError = () => {
    dispatch({ type: 'auth/clearError' });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        logout: handleLogout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 