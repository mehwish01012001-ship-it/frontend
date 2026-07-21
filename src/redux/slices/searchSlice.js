import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: { min: 0, max: 100000 },
    sortBy: 'relevance',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload.results;
      state.pagination = action.payload.pagination;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearSearch(state) {
      state.query = '';
      state.results = [];
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    },
  },
});

export const { setQuery, setResults, setFilters, setLoading, setError, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
