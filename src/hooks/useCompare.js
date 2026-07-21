import { useSelector } from 'react-redux';

const useCompare = () => {
  return useSelector((state) => state.compare || { items: [] });
};

export default useCompare;
