import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeCartDrawer } from '../../redux/slices/cartSlice';
import './CartDrawer.css';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.cart.isDrawerOpen);
  const items = useSelector((state) => state.cart.items || []);
  const total = useSelector((state) => state.cart.total || 0);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => dispatch(closeCartDrawer());

  const handleViewCart = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <div className="cart-drawer-backdrop" onClick={handleClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">Added to your bag</p>
            <h3 className="cart-drawer__title">Shopping Cart</h3>
          </div>
          <button type="button" className="cart-drawer__close" onClick={handleClose}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty.</p>
            <button type="button" className="cart-drawer__button" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__list">
              {items.map((item) => {
                const product = item.product || {};
                const itemName = product.name || item.name || 'Product';
                const itemPrice = item.price || product.price || 0;
                const itemImage = product.image || product.thumbnail || product.mainImage || item.image;

                return (
                  <div key={item._id || `${itemName}-${item.size || ''}`} className="cart-drawer__item">
                    {itemImage ? (
                      <img src={itemImage} alt={itemName} className="cart-drawer__image" />
                    ) : (
                      <div className="cart-drawer__image placeholder">No image</div>
                    )}

                    <div className="cart-drawer__details">
                      <p className="cart-drawer__item-name">{itemName}</p>
                      <p className="cart-drawer__meta">
                        Qty {item.quantity || 1}
                        {item.size ? ` • ${item.size}` : ''}
                      </p>
                      <p className="cart-drawer__price">Rs. {Number(itemPrice).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__summary">
                <span>Subtotal</span>
                <strong>Rs. {Number(total).toLocaleString()}</strong>
              </div>
              <button type="button" className="cart-drawer__button primary" onClick={handleViewCart}>
                View Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
