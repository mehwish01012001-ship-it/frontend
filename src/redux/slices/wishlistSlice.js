import { createSlice } from '@reduxjs/toolkit';

const WISHLIST_STORAGE_KEY = 'rq_wishlist';

const loadWishlistFromStorage = () => {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load wishlist from storage', error);
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save wishlist to storage', error);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action) {
      const items = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.products || [];
      state.items = items;
      saveWishlistToStorage(state.items);
    },
    addItem(state, action) {
      const item = action.payload;
      const itemId = item?._id || item?.id;
      if (!itemId) return;

      const exists = state.items.some(
        (existing) => (existing._id || existing.id) === itemId
      );

      if (!exists) {
        state.items.push(item);
        saveWishlistToStorage(state.items);
      }
    },
    removeItem(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== productId
      );
      saveWishlistToStorage(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      saveWishlistToStorage([]);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setWishlist, addItem, removeItem, clearWishlist, setLoading, setError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
