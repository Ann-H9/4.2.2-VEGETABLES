import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/store/productsSlice';
import cartReducer from '@/store/cartSlice';
import uiReducer from '@/store/uiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
