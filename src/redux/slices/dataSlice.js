import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  banners: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setBanners(state, action) {
      state.banners = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setCategories, setBanners, setLoading, setError } = dataSlice.actions;
export default dataSlice.reducer;
