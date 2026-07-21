import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import dataReducer from './slices/dataSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import compareReducer from './slices/compareSlice';
import orderReducer from './slices/orderSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    data: dataReducer,
    product: productReducer,
    category: categoryReducer,
    compare: compareReducer,
    order: orderReducer,
    search: searchReducer,
  },
});

export default store;
