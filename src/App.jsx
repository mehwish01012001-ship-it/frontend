import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';
import { authService } from './services';
import { setUser, clearUser, setAuthInitialized } from './redux/slices/authSlice';
import { clearCart } from './redux/slices/cartSlice';
import { clearWishlist } from './redux/slices/wishlistSlice';
import { useWishlist } from './hooks/useWishlist';
import { useCart } from './hooks/useCart';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';

const AppContent = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const { fetchWishlist } = useWishlist();
  const { fetchCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());
      dispatch(setAuthInitialized());
      return;
    }

    const loadUser = async () => {
      try {
        const response = await authService.getProfile();
        dispatch(setUser(response.data.user || response.data));
      } catch (error) {
        dispatch(clearUser());
        dispatch(clearCart());
        dispatch(clearWishlist());
      } finally {
        dispatch(setAuthInitialized());
      }
    };

    loadUser();
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetchWishlist();
    fetchCart();
  }, [fetchWishlist, fetchCart]);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <ToastContainer />
      </Router>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
