import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompareItems(state, action) {
      state.items = action.payload;
    },
    addToCompare(state, action) {
      const exists = state.items.find(item => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCompare(state) {
      state.items = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCompareItems, addToCompare, removeFromCompare, clearCompare, setLoading, setError } = compareSlice.actions;
export default compareSlice.reducer;
