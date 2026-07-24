import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cartService } from '../services';
import { setCart, clearCart, openCartDrawer } from '../redux/slices/cartSlice';
import { TOAST_MESSAGES } from '../constants';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, total, loading } = useSelector((state) => state.cart);

  const fetchCart = useCallback(async () => {
    try {
      const response = await cartService.getCart();
      const cart = response.data.cart || response.data || { items: [] };
      dispatch(setCart(cart));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [dispatch]);

  const addToCart = useCallback(
    async (product, quantity = 1, size = '', color = '', note = '') => {
      try {
        const response = await cartService.addToCart({
          productId: product._id || product.id,
          quantity,
          size,
          color,
          note,
        });
        const cart = response.data.cart || response.data || { items: [] };
        dispatch(setCart(cart));
        dispatch(openCartDrawer());
        toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
        return response.data;
      } catch (error) {
        console.error('Error adding to cart:', error);
        const message =
          error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch]
  );

  const updateCartItem = useCallback(
    async (itemId, quantity) => {
      try {
        const response = await cartService.updateCartItem({ itemId, quantity });
        const cart = response.data.cart || response.data || { items: [] };
        dispatch(setCart(cart));
        toast.success(TOAST_MESSAGES.CART_UPDATED);
        return response.data;
      } catch (error) {
        console.error('Error updating cart item:', error);
        const message =
          error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      try {
        const response = await cartService.removeFromCart(itemId);
        const cart = response.data.cart || response.data || { items: [] };
        dispatch(setCart(cart));
        toast.success(TOAST_MESSAGES.REMOVE_FROM_CART_SUCCESS);
        return response.data;
      } catch (error) {
        console.error('Error removing from cart:', error);
        const message =
          error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch]
  );

  const clearMyCart = useCallback(async () => {
    try {
      await cartService.clearCart();
      dispatch(clearCart());
      toast.success(TOAST_MESSAGES.CART_CLEARED);
    } catch (error) {
      console.error('Error clearing cart:', error);
      const message =
        error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
      toast.error(message);
      throw error;
    }
  }, [dispatch]);

  return {
    items,
    total,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart: clearMyCart,
  };
};
