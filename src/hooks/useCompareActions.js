import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { compareService } from '../services/compareService';
import {
  addToCompare as addToCompareAction,
  removeFromCompare as removeFromCompareAction,
  setCompareItems,
  setLoading,
  setError,
} from '../redux/slices/compareSlice';
import { TOAST_MESSAGES } from '../constants';

const getProductId = (product) => product?._id || product?.id;

export const useCompareActions = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.compare);

  const fetchCompareItems = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await compareService.getCompareItems();
      const compare = response.data.compare || response.data || [];
      dispatch(setCompareItems(compare));
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const addToCompare = useCallback(
    async (product) => {
      const productId = getProductId(product);
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const alreadyAdded = items.some((item) => getProductId(item) === productId);
      if (alreadyAdded) {
        toast.info('This product is already in compare list.');
        return;
      }

      dispatch(addToCompareAction(product));

      try {
        const response = await compareService.addToCompare({ productId });
        const compare = response.data.compare || response.data || [];
        dispatch(setCompareItems(compare));
        toast.success('Product added to compare');
      } catch (error) {
        dispatch(removeFromCompareAction(productId));
        const message = error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch, items]
  );

  const removeFromCompare = useCallback(
    async (productId) => {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      dispatch(removeFromCompareAction(productId));

      try {
        const response = await compareService.removeFromCompare(productId);
        const compare = response.data.compare || response.data || [];
        dispatch(setCompareItems(compare));
        toast.success('Product removed from compare');
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || TOAST_MESSAGES.ERROR;
        toast.error(message);
        throw error;
      }
    },
    [dispatch]
  );

  const isInCompare = useCallback(
    (productId) => items.some((item) => getProductId(item) === productId),
    [items]
  );

  return {
    compareItems: items,
    fetchCompareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
  };
};
