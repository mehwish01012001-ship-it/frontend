import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initialized = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
      localStorage.removeItem('token');
    },
    setAuthInitialized(state) {
      state.initialized = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, setAuthInitialized } = authSlice.actions;
export default authSlice.reducer;
