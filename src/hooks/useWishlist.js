import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { wishlistService } from '../services';
import {
  setWishlist,
  addItem,
  removeItem,
  setLoading,
  setError,
} from '../redux/slices/wishlistSlice';
import { TOAST_MESSAGES } from '../constants';

const getProductId = (product) => product?._id || product?.id;

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  const isInWishlist = useCallback(
    (productId) =>
      items.some((item) => (item._id || item.id) === productId),
    [items]
  );

  const fetchWishlist = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await wishlistService.getWishlist();
      const wishlist = response.data.wishlist || response.data || [];
      dispatch(setWishlist(wishlist));
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const addToWishlist = useCallback(
    async (product) => {
      const productId = getProductId(product);
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (isInWishlist(productId)) {
        toast.info('This item is already in your wishlist.');
        return;
      }

      if (product) {
        dispatch(addItem(product));
      }

      try {
        const response = await wishlistService.addToWishlist({ productId });
        const wishlist = response.data.wishlist || response.data || [];
        dispatch(setWishlist(wishlist));
        toast.success(TOAST_MESSAGES.ADD_TO_WISHLIST_SUCCESS);
        return response.data;
      } catch (error) {
        dispatch(removeItem(productId));
        const message =
          error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch, isInWishlist]
  );

  const removeFromWishlist = useCallback(
    async (itemOrProductId) => {
      const productId =
        typeof itemOrProductId === 'string'
          ? itemOrProductId
          : getProductId(itemOrProductId);
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (!isInWishlist(productId)) {
        toast.info('This item is not in your wishlist.');
        return;
      }

      const removedItem = items.find(
        (item) => (item._id || item.id) === productId
      );
      dispatch(removeItem(productId));

      try {
        const response = await wishlistService.removeFromWishlist(productId);
        toast.success(TOAST_MESSAGES.REMOVE_FROM_WISHLIST_SUCCESS);
        return response.data;
      } catch (error) {
        if (removedItem) {
          dispatch(addItem(removedItem));
        }
        const message =
          error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch, isInWishlist, items]
  );

  return {
    items,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount: items.length,
  };
};
