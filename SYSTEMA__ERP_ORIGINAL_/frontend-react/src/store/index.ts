import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import productsReducer from './slices/productsSlice';
import stockReducer from './slices/stockSlice';
import financialReducer from './slices/financialSlice';
import customersReducer from './slices/customersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    products: productsReducer,
    stock: stockReducer,
    financial: financialReducer,
    customers: customersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 