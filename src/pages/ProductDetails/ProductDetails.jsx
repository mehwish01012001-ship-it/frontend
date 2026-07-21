



import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import {
  FiHeart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

import { productService } from "../../services";
import { getMediaUrl } from "../../services/api";
import { useCart } from "../../hooks/useCart";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [tab, setTab] = useState("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveImage(0);
    fetchProduct();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  const isVideoUrl = (value) => {
    if (!value) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(value) || /video\//i.test(value);
  };

  const fetchProduct = async () => {
    try {
      const res = await productService.getProductBySlug(slug);
      const productData = res.data?.product || res.data;
      setProduct(productData);
    } catch (error) {
      navigate("/shop");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (product?.sizes?.length && !selectedSize) {
      toast.warn("Please select a size first");
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize, selectedColor);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to add product to cart.";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="pd-loader-container">
        <div className="pd-spinner"></div>
        <p className="pd-loader-text">Fetching Premium Collection...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-loader-container">
        <p className="pd-loader-text">Product Not Found</p>
      </div>
    );
  }

  const mediaItems = (() => {
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
          return { url: item, type: isVideoUrl(item) ? "video" : "image" };
        }
        if (typeof item === "object") {
          const url = item.url || item.src || item.image || item.path;
          if (!url) return null;
          return {
            url,
            type: item.type || item.mediaType || (isVideoUrl(url) ? "video" : "image"),
          };
        }
        return null;
      })
      .filter(Boolean);
  })();

  const currentMedia = mediaItems[activeImage] || mediaItems[0] || null;
  const currentImageUrl = currentMedia?.url
    ? getMediaUrl(currentMedia.url)
    : "https://via.placeholder.com/800x1200?text=No+Image+Available";

  // Build high-value search metadata keywords
  const seoKeywords = [
    product.name,
    product.brand || "Luxury Clothing",
    "women stitched dress",
    "premium eastern wear",
    "designer stitched pret",
    "pakistani stitched apparel",
    product.category || "designer wear"
  ].join(", ");

  const canonicalUrl = `${window.location.origin}/product/${slug}`;

  // Structured Schema Data (JSON-LD) for Rich Search Snippets
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": mediaItems.filter((item) => item.type !== "video").map((item) => getMediaUrl(item.url)),
    "description": product.description || "Premium stitched outfit from our exclusive luxury catalog.",
    "sku": product.sku || `SKU-${product._id || slug}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Luxury Collection"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <section className="pd-page">
      {/* Dynamic SEO Meta Tags Injection */}
      <Helmet>
        <title>{`${product.name} | Premium Stitched Collection`}</title>
        <meta name="description" content={product.description?.substring(0, 160) || "Explore our premium women's stitched outfits. Designed to perfection."} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Social Share Tags */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Premium Women's Wear`} />
        <meta property="og:description" content={product.description?.substring(0, 160)} />
        <meta property="og:image" content={currentImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Luxury Apparel" />

        {/* Twitter Card Optimization */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Premium Women's Wear`} />
        <meta name="twitter:description" content={product.description?.substring(0, 160)} />
        <meta name="twitter:image" content={currentImageUrl} />

        {/* JSON-LD Schema Tag Injection */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="pd-container">
        {/* Gallery Side */}
        <div className="pd-gallery">
          <div className="pd-main-image">
            {currentMedia?.type === "video" ? (
              <video
                className="pd-main-media"
                src={currentImageUrl}
                controls
                playsInline
                autoPlay
                muted
                loop
              />
            ) : (
              <img src={currentImageUrl} alt={product.name} />
            )}
            {currentMedia?.type === "video" && <span className="pd-media-badge">Video</span>}
            <button
              className={`wishlist-btn ${wishlist ? "active" : ""}`}
              onClick={() => setWishlist(!wishlist)}
              aria-label="Add to wishlist"
            >
              <FiHeart />
            </button>
          </div>

          {mediaItems.length > 1 && (
            <div className="pd-thumbnails">
              {mediaItems.map((item, index) => (
                <button
                  key={`${item.url}-${index}`}
                  className={`thumb ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View media ${index + 1}`}
                >
                  {item.type === "video" ? (
                    <div className="thumb-video-preview">▶</div>
                  ) : (
                    <img src={getMediaUrl(item.url)} alt={`${product.name} alternate view`} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail Specifications Side */}
        <div className="pd-content">
          <span className="pd-badge">
            {product.brand || "Luxury Premium"}
          </span>

          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            <FiStar />
            <span>
              {product.rating ? `${product.rating.toFixed(1)} / 5.0` : "Highly Rated"}
            </span>
          </div>

          <div className="pd-price-row">
            <span className="current-price">${product.price}</span>
            {product.comparePrice && (
              <span className="old-price">${product.comparePrice}</span>
            )}
          </div>

          <p className="pd-short-desc">{product.description}</p>

          {/* Size Attributes */}
          {product.sizes?.length > 0 && (
            <div className="pd-attribute-section">
              <h4 className="pd-section-label">Select Stitched Size</h4>
              <div className="size-wrapper">
                {product.sizes.map((size, index) => {
                  const value = typeof size === "string" ? size : size.name;
                  return (
                    <button
                      key={index}
                      className={selectedSize === value ? "active" : ""}
                      onClick={() => setSelectedSize(value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Attributes */}
          {product.colors?.length > 0 && (
            <div className="pd-attribute-section">
              <h4 className="pd-section-label">Select Color Option</h4>
              <div className="color-wrapper">
                {product.colors.map((color, index) => {
                  const value = typeof color === "string" ? color : color.name;
                  return (
                    <button
                      key={index}
                      className={selectedColor === value ? "active" : ""}
                      onClick={() => setSelectedColor(value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="pd-qty-section">
            <h4 className="pd-section-label">Quantity</h4>
            <div className="quantity-box">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease Quantity"
              >
                <FiMinus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase Quantity"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Checkout & Basket Actions */}
          <div className="action-buttons">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              <FiShoppingBag />
              Add To Cart
            </button>
            <button className="buy-now-btn">
              Buy Now
            </button>
          </div>

          {/* Brand Assurances */}
          <div className="product-features">
            <div>
              <FiTruck />
              <span>Complimentary Delivery</span>
            </div>
            <div>
              <FiShield />
              <span>Secure Transactions</span>
            </div>
            <div>
              <FiRefreshCw />
              <span>Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Content Tabs */}
      <div className="pd-tabs-container">
        <div className="pd-tabs">
          <button
            className={tab === "description" ? "active" : ""}
            onClick={() => setTab("description")}
          >
            Product Story
          </button>
          <button
            className={tab === "details" ? "active" : ""}
            onClick={() => setTab("details")}
          >
            Specifications
          </button>
        </div>

        <div className="pd-tab-content">
          {tab === "description" && (
            <p className="tab-paragraph">{product.description}</p>
          )}

          {tab === "details" && (
            <div className="details-grid">
              <div className="grid-row">
                <span>Brand Label</span>
                <strong>{product.brand || "Luxury Premium"}</strong>
              </div>
              <div className="grid-row">
                <span>SKU Registry</span>
                <strong>{product.sku || "N/A"}</strong>
              </div>
              <div className="grid-row">
                <span>Inventory Status</span>
                <strong>{product.stock > 0 ? `${product.stock} Units Left` : "Out Of Stock"}</strong>
              </div>
              {product.category && (
                <div className="grid-row">
                  <span>Category classification</span>
                  <strong>{product.category}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;