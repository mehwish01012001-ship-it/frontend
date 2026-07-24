import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FiShoppingBag,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiTruck,
  FiTag,
  FiShield,
  FiArrowRight
} from "react-icons/fi";

import { useCart } from "../../hooks/useCart";
import { getMediaUrl } from "../../services/api";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./Cart.css";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { updateCartItem, removeFromCart, clearCart } = useCart();

  const [promoCode, setPromoCode] =
    useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    );
  }, [items]);

  const shipping =
    subtotal > 200 ? 0 : 10;

  const tax = subtotal * 0.1;

  const total =
    subtotal + shipping + tax;

  const increaseQty = async (item) => {
    await updateCartItem(item._id, item.quantity + 1);
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    await updateCartItem(item._id, item.quantity - 1);
  };

  const removeProduct = async (id) => {
    await removeFromCart(id);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  if (!items.length) {
    return (
      <div className="cart-page empty-page">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <div className="empty-cart-card">

          <div className="empty-icon">
            <FiShoppingBag />
          </div>

          <h2>Your Cart Is Empty</h2>

          <p>
            Looks like you haven't added
            any products yet.
          </p>

          <Link
            to="/shop"
            className="shop-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="cart-container">
        <Breadcrumbs />

        <div className="cart-header">

          <div>
            <span className="cart-badge">
              RQ FASHION
            </span>

            <h1>Shopping Cart</h1>

            <p>
              {items.length}
              {" "}
              Item(s) in your cart
            </p>
          </div>

          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
          >
            <FiTrash2 />
            Clear Cart
          </button>

        </div>

        <div className="cart-layout">

          {/* LEFT */}

          <div className="cart-items">

            {items.map((item) => (

              <div
                className="cart-item"
                key={item._id}
              >

                <Link
                  to={`/product/${item.product?.slug || item.product?._id}`}
                  className="cart-item-thumbnail"
                >
                  <img
                    src={getMediaUrl(
                      item.product?.images?.[0]?.url
                    )}
                    alt={item.product?.name}
                  />
                </Link>

                <div className="item-info">

                  <h3>
                    <Link
                      to={`/product/${item.product?.slug || item.product?._id}`}
                      className="cart-item-link"
                    >
                      {item.product?.name}
                    </Link>
                  </h3>

                  {item.size && (
                    <p>
                      Size:
                      {" "}
                      {item.size}
                    </p>
                  )}

                  {item.color && (
                    <p>
                      Color:
                      {" "}
                      {item.color}
                    </p>
                  )}

                  <span className="price">
                    Rs. {item.price.toFixed(2)}
                  </span>

                </div>

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQty(item)
                    }
                  >
                    <FiMinus />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item)
                    }
                  >
                    <FiPlus />
                  </button>

                </div>

                <div className="item-total">

                  Rs. {(item.quantity * item.price).toFixed(2)}

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeProduct(item._id)
                  }
                >
                  <FiTrash2 />
                </button>

              </div>

            ))}

          </div>

          {/* RIGHT */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="delivery-card">

              <FiTruck />

              <div>
                <h4>
                  Estimated Delivery
                </h4>

                <p>
                  2 - 4 Business Days
                </p>
              </div>

            </div>

            <div className="shipping-progress">

              <p>
                Free Shipping Progress
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(
                      subtotal / 3,
                      100
                    )}%`
                  }}
                />

              </div>

            </div>

            <div className="coupon-box">

              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) =>
                  setPromoCode(
                    e.target.value
                  )
                }
              />

              <button>
                Apply
              </button>

            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                Rs. {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                Rs. {shipping.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>
                Rs. {tax.toFixed(2)}
              </span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>
                Rs. {total.toFixed(2)}
              </span>
            </div>

            <div className="secure-payment">

              <FiShield />

              Secure Checkout
              Protected by SSL

            </div>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Checkout Now

              <FiArrowRight />
            </Link>

            <Link
              to="/shop"
              className="continue-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;