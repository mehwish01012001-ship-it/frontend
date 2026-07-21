import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  filters: {
    category: null,
    priceRange: { min: 0, max: 100000 },
    sortBy: 'newest',
    search: '',
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { setProducts, setCurrentProduct, setLoading, setError, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
