import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  reason: string;
  userId: string;
}

interface StockState {
  movements: StockMovement[];
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  movements: [],
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setMovements: (state, action: PayloadAction<StockMovement[]>) => {
      state.movements = action.payload;
    },
    addMovement: (state, action: PayloadAction<StockMovement>) => {
      state.movements.push(action.payload);
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
  setMovements,
  addMovement,
  setLoading,
  setError,
} = stockSlice.actions;

export default stockSlice.reducer; 