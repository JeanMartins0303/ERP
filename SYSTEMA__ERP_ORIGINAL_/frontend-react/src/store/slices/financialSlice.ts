import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface FinancialState {
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: FinancialState = {
  transactions: [],
  balance: 0,
  loading: false,
  error: null,
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.balance = action.payload.reduce((acc, curr) => {
        return acc + (curr.type === 'income' ? curr.amount : -curr.amount);
      }, 0);
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      state.balance += action.payload.type === 'income' 
        ? action.payload.amount 
        : -action.payload.amount;
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        const oldAmount = state.transactions[index].amount;
        const oldType = state.transactions[index].type;
        
        // Remove o valor antigo do saldo
        state.balance -= oldType === 'income' ? oldAmount : -oldAmount;
        
        // Atualiza a transação
        state.transactions[index] = action.payload;
        
        // Adiciona o novo valor ao saldo
        state.balance += action.payload.type === 'income' 
          ? action.payload.amount 
          : -action.payload.amount;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(t => t.id === action.payload);
      if (transaction) {
        state.balance -= transaction.type === 'income' 
          ? transaction.amount 
          : -transaction.amount;
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
} = financialSlice.actions;

export default financialSlice.reducer; 