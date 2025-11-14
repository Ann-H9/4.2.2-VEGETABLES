import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

type UIState = {
  cartModalOpen: boolean;
  quantityByProductId: Record<number, number>;
};

const initialState: UIState = {
  cartModalOpen: false,
  quantityByProductId: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCartModal: (state) => {
      state.cartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.cartModalOpen = false;
    },
    setProductQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      state.quantityByProductId[id] = Math.max(1, quantity);
    },
    resetProductQuantity: (state, action: PayloadAction<{ id: number }>) => {
      delete state.quantityByProductId[action.payload.id];
    },
  },
});

export const {
  openCartModal,
  closeCartModal,
  setProductQuantity,
  resetProductQuantity,
} = uiSlice.actions;

export default uiSlice.reducer;


export const selectCartModalOpen = (state: RootState) => state.ui.cartModalOpen;
export const selectCardQuantity = (id: number) => (state: RootState) =>
  state.ui.quantityByProductId[id] ?? 1;