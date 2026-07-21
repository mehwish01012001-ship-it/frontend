import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    addOrder(state, action) {
      state.orders.unshift(action.payload);
    },
    updateOrder(state, action) {
      const index = state.orders.findIndex(o => o._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setCurrentOrder, addOrder, updateOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
