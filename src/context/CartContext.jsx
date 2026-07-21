import React, { createContext, useMemo, useState } from 'react';

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const value = useMemo(() => ({ cartItems, setCartItems }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
