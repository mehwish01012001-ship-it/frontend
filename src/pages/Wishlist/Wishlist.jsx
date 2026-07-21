



import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiArrowRight,
  FiStar,
  FiX,
  FiEye,
} from "react-icons/fi";
import { useWishlist } from "../../hooks/useWishlist";
import { getMediaUrl } from "../../services/api";
import "./Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { removeFromWishlist } = useWishlist();

  const stats = useMemo(
    () => ({
      total: wishlistItems.length,
      readyToBuy: Math.floor(wishlistItems.length * 0.6),
    }),
    [wishlistItems.length]
  );

  const handleRemoveItem = async (productId) => {
    await removeFromWishlist(productId);
  };

  const handleViewProduct = (product) => {
    const slug = product.slug || product._id || product.id;
    navigate(`/product/${slug}`);
  };

  return (
    <div className="wishlist-page">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>

      <div className="wishlist-wrapper">
        <div className="wishlist-header">
          <span className="wishlist-tag">
            <FiHeart />
            Premium Wishlist
          </span>

          <h1>
            Your Fashion
            <span> Wishlist</span>
          </h1>

          <p>
            Save your favorite fashion pieces and access them anytime.
          </p>
        </div>

       

        

          

        {wishlistItems.length === 0 ? (
          <div className="wishlist-card">
            <div className="empty-heart">
              <FiHeart />
            </div>

            <h2>Your Wishlist is Empty</h2>

            <p>
              Discover premium collections and save your favorite products for
              future purchases.
            </p>

            <button
              className="shop-btn"
              onClick={() => navigate("/shop")}
            >
              Explore Collection
              <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => {
              const productId = item._id || item.id;
            const imageUrl = item.images?.[0]?.url;

              return (
                <div key={productId} className="wishlist-item">
                  <div className="item-image">
                  <img
  src={getMediaUrl(imageUrl)}
  alt={item.name}
  className="product-img"
/>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(productId)}
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                    >
                      <FiX />
                    </button>

                    <div className="item-actions">
                      <button
                        onClick={() => handleViewProduct(item)}
                        className="action-btn view-btn"
                        title="View product"
                      >
                        <FiEye />
                      </button>

                      <button
                        className="action-btn cart-btn"
                        title="Add to cart"
                      >
                        <FiShoppingBag />
                      </button>
                    </div>

                    {item.comparePrice > item.price && (
                      <div className="item-badge">
                        -
                        {Math.round(
                          ((item.comparePrice - item.price) /
                            item.comparePrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>

                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-brand">
                      {item.brand || "Luxury Collection"}
                    </p>

                    <div className="item-price">
                      <span className="current-price">
                        Rs. {Number(item.price).toFixed(2)}
                      </span>
                      {item.comparePrice > item.price && (
                        <span className="compare-price">
                          Rs. {Number(item.comparePrice).toFixed(2)}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;