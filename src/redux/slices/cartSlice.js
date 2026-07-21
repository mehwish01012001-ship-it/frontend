import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items || [];
      state.total = (state.items || []).reduce(
        (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
        0
      );
    },
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity(state, action) {
      const item = state.items.find((item) => item._id === action.payload.itemId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
