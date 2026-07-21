



import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiEye,
  FiStar,
  FiColumns,
} from "react-icons/fi";

import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { useCompareActions } from "../../hooks/useCompareActions";
import { getMediaUrl } from "../../services/api";
import "./ProductCard.css";

const getProductId = (product) => product?._id || product?.id;

const isVideoMedia = (value) => {
  if (!value) return false;
  const raw = String(value).trim();
  return /\.(mp4|webm|ogg|mov)$/i.test(raw) || /video\//i.test(raw);
};

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist: isInWishlistFromState,
  } = useWishlist();

  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompareActions();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items || []);

  const productId = getProductId(product);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const mediaItems = useMemo(() => {
    const sources = [];

    if (Array.isArray(product?.images)) {
      sources.push(...product.images);
    }

    if (Array.isArray(product?.media)) {
      sources.push(...product.media);
    }

    if (Array.isArray(product?.gallery)) {
      sources.push(...product.gallery);
    }

    if (product?.image || product?.thumbnail || product?.mainImage) {
      sources.push(product.image || product.thumbnail || product.mainImage);
    }

    return sources
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") {
          return { url: item, type: isVideoMedia(item) ? "video" : "image" };
        }

        if (typeof item === "object") {
          const url = item.url || item.src || item.image || item.path;
          if (!url) return null;
          return {
            url,
            type: item.type || item.mediaType || (isVideoMedia(url) ? "video" : "image"),
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [product]);

  useEffect(() => {
    if (mediaItems.length <= 1) {
      setActiveMediaIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [mediaItems.length]);

  const isInCart = useMemo(
    () =>
      cartItems.some(
        (item) =>
          getProductId(item.product) === productId ||
          getProductId(item) === productId
      ),
    [cartItems, productId]
  );

  const isWishlisted = useMemo(
    () =>
      typeof isInWishlist === "boolean"
        ? isInWishlist
        : isInWishlistFromState(productId),
    [isInWishlist, isInWishlistFromState, productId]
  );

  const isCompareSelected = useMemo(
    () => isInCompare(productId),
    [isInCompare, productId]
  );

  const handleWishlistClick = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!isAuthenticated) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      if (onAddToWishlist) {
        onAddToWishlist(productId);
        return;
      }

      if (isWishlisted) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(product);
      }
    },
    [onAddToWishlist, product, productId, isWishlisted, addToWishlist, removeFromWishlist, isAuthenticated, location.pathname, navigate]
  );

  const handleCompareClick = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!isAuthenticated) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      if (isCompareSelected) {
        await removeFromCompare(productId);
      } else {
        await addToCompare(product);
      }
    },
    [addToCompare, isAuthenticated, isCompareSelected, navigate, location.pathname, product, productId, removeFromCompare]
  );

  const handleAddToCartClick = useCallback(
    async (event) => {
      event.stopPropagation();

      if (!isAuthenticated) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      if (isInCart) {
        return;
      }

      if (onAddToCart) {
        onAddToCart(product);
        return;
      }

      await addToCart(product, 1, '', '');
    },
    [onAddToCart, product, addToCart, isInCart, isAuthenticated, location.pathname, navigate]
  );

  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) /
          product.comparePrice) *
          100
      )
    : 0;

  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const imageUrl = currentMedia?.url ? getMediaUrl(currentMedia.url) : "https://via.placeholder.com/600x700";
  const currentMediaType = currentMedia?.type || (isVideoMedia(currentMedia?.url) ? "video" : "image");

  return (
    <motion.div
      className="lux-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`image-section ${isInCart ? 'cart-product' : ''} ${mediaItems.length > 1 ? 'has-gallery' : ''}`}>
        {currentMediaType === "video" ? (
          <video
            src={imageUrl}
            alt={product.name}
            className="product-image product-video"
            muted
            autoPlay
            playsInline
            loop
          />
        ) : (
          <img
            src={imageUrl}
            alt={product.name}
            className="product-image"
          />
        )}

        {mediaItems.length > 1 && (
          <div className="media-counter">
            {activeMediaIndex + 1}/{mediaItems.length}
          </div>
        )}

        {discount > 0 && (
          <div className="sale-badge">
            -{discount}%
          </div>
        )}

        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FiHeart />
        </button>

        <div className="hover-actions">
          <button
            onClick={() =>
              navigate(
                `/product/${
                  product.slug ||
                  productId
                }`
              )
            }
            aria-label="View product"
          >
            <FiEye />
          </button>

          <button
            className={`compare-btn ${isCompareSelected ? 'active' : ''}`}
            onClick={handleCompareClick}
            aria-label={
              isCompareSelected
                ? 'Remove from compare'
                : 'Add to compare'
            }
          >
            <FiColumns />
          </button>

          <button
            onClick={handleAddToCartClick}
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="brand">
          {product.brand ||
            "Luxury Collection"}
        </span>

        <h3 className="product-title">
          {product.name}
        </h3>

        <div className="rating">
          <FiStar />
          <span>
            {product.rating ? product.rating.toFixed(1) : 'New'}
          </span>
        </div>

        <div className="price-wrapper">
          <span className="current-price">
            Rs. {Number(product.price).toFixed(2)}
          </span>

          {product.comparePrice >
            product.price && (
            <>
              <span className="compare-price">
                Rs. {Number(product.comparePrice).toFixed(2)}
              </span>

              <span className="save-badge-price">
                Save {discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;