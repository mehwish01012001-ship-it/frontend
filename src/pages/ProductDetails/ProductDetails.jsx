import React, { useEffect, useState, useTransition } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Seo from "../../components/SEO";
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
  FiZoomIn
} from "react-icons/fi";

import { productService } from "../../services";
import { getMediaUrl } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [, startTransition] = useTransition();

  // Instant hydration from state if available
  const [product, setProduct] = useState(location.state?.product || null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productNote, setProductNote] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [tab, setTab] = useState("description");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setActiveImage(0);
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const isVideoUrl = (value) => {
    if (!value) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(value) || /video\//i.test(value);
  };

  const fetchProduct = async () => {
    try {
      const res = await productService.getProductBySlug(slug);
      const productData = res.data?.product || res.data;
      
      startTransition(() => {
        setProduct(productData);
      });
    } catch (error) {
      toast.error("Failed to load product details");
      navigate("/shop");
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (product?.sizes?.length && !selectedSize) {
      toast.warn("Please select a size first");
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize, selectedColor, productNote);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to add product to cart.";
      toast.error(message);
    }
  };

  const handleBuyNow = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (product?.sizes?.length && !selectedSize) {
      toast.warn("Please select a size first");
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize, selectedColor, productNote);
      navigate("/checkout");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to proceed to checkout.";
      toast.error(message);
    }
  };

  const mediaItems = (() => {
    if (!product) return [];
    const sources = [];

    if (Array.isArray(product?.images)) sources.push(...product.images);
    if (Array.isArray(product?.media)) sources.push(...product.media);
    if (Array.isArray(product?.gallery)) sources.push(...product.gallery);
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

  // Search Metadata
  const seoKeywords = [
    product?.name || "",
    product?.brand || "Stitched Fashion",
    "women stitched dress",
    "premium eastern wear",
    "designer stitched pret",
    "pakistani stitched apparel",
    product?.category || "stitched wear",
  ].filter(Boolean).join(", ");

  const canonicalUrl = `${window.location.origin}/productdetails/${slug}`;

  const schemaMarkup = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: mediaItems.filter((item) => item.type !== "video").map((item) => getMediaUrl(item.url)),
    description: product.description || "Stitched outfit from our collection.",
    sku: product.sku || `SKU-${product._id || slug}`,
    brand: {
      "@type": "Brand",
      name: product.brand || "RQ Fashion",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "PKR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  } : null;

  return (
    <div className="rq-pd-wrapper">
      {product && (
        <Seo
          title={`${product.name} | Stitched Apparel`}
          description={product.description?.substring(0, 160) || "Explore our women's stitched outfits. Fine craftsmanship and fit."}
          keywords={seoKeywords}
          canonicalUrl={canonicalUrl}
          ogType="product"
          ogTitle={`${product.name} | Stitched Collection`}
          ogDescription={product.description?.substring(0, 160)}
          twitterCard="summary_large_image"
          image={currentImageUrl}
          schemaMarkup={schemaMarkup}
        />
      )}

      <section className="rq-pd-page">
        <div className="rq-pd-container">
          <Breadcrumbs />

          {product ? (
            <div className="rq-pd-grid">
              {/* Gallery Section */}
              <div className="rq-pd-gallery-layout">
                {/* Vertical Thumbnail List */}
                {mediaItems.length > 1 && (
                  <div className="rq-pd-thumbnails">
                    {mediaItems.map((item, index) => (
                      <button
                        key={`${item.url}-${index}`}
                        className={`rq-pd-thumb ${activeImage === index ? "active" : ""}`}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View item ${index + 1}`}
                      >
                        {item.type === "video" ? (
                          <div className="rq-thumb-video">▶</div>
                        ) : (
                          <img src={getMediaUrl(item.url)} alt={`${product.name} thumb ${index + 1}`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Hero Main Media Showcase */}
                <div 
                  className="rq-pd-main-stage"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  {currentMedia?.type === "video" ? (
                    <video
                      className="rq-pd-media-element"
                      src={currentImageUrl}
                      controls
                      playsInline
                      autoPlay
                      muted
                      loop
                    />
                  ) : (
                    <div className="rq-pd-zoom-frame">
                      <img 
                        src={currentImageUrl} 
                        alt={product.name} 
                        className="rq-pd-media-element"
                        style={isZoomed ? {
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                          transform: 'scale(1.8)'
                        } : undefined}
                      />
                    </div>
                  )}

                  {currentMedia?.type === "video" && <span className="rq-pd-media-badge">Video</span>}

                  {currentMedia?.type !== "video" && (
                    <div className="rq-pd-hover-tag">
                      <FiZoomIn /> HOVER TO ZOOM
                    </div>
                  )}

                  <button
                    className={`rq-pd-wishlist-btn ${wishlist ? "active" : ""}`}
                    onClick={() => setWishlist(!wishlist)}
                    aria-label="Wishlist toggle"
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>

              {/* Product Specifications Section */}
              <div className="rq-pd-content-card">
                <span className="rq-pd-brand-badge">
                  {product.brand || "Exclusive Pret"}
                </span>

                <h1 className="rq-pd-title">{product.name}</h1>

                <div className="rq-pd-rating">
                  <FiStar />
                  <span>
                    {product.rating ? `${product.rating.toFixed(1)} / 5.0` : "Customer Favorite"}
                  </span>
                </div>

                <div className="rq-pd-price-row">
                  <span className="rq-current-price">Rs. {product.price}</span>
                  {product.comparePrice && (
                    <span className="rq-old-price">Rs. {product.comparePrice}</span>
                  )}
                </div>

                <div className="rq-pd-sku-row">
                  <span className="rq-sku-label">SKU:</span>
                  <span className="rq-sku-val">{product.sku || `SKU-${product._id || slug}`}</span>
                </div>

                <p className="rq-pd-short-desc">{product.description}</p>

                {/* Size Selection */}
                {product.sizes?.length > 0 && (
                  <div className="rq-pd-opt-group">
                    <h4 className="rq-pd-label">Select Stitched Size</h4>
                    <div className="rq-pd-btn-grid">
                      {product.sizes.map((size, idx) => {
                        const val = typeof size === "string" ? size : size.name;
                        return (
                          <button
                            key={idx}
                            className={`rq-pd-opt-btn ${selectedSize === val ? "active" : ""}`}
                            onClick={() => setSelectedSize(val)}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors?.length > 0 && (
                  <div className="rq-pd-opt-group">
                    <h4 className="rq-pd-label">Select Color</h4>
                    <div className="rq-pd-btn-grid">
                      {product.colors.map((color, idx) => {
                        const val = typeof color === "string" ? color : color.name;
                        return (
                          <button
                            key={idx}
                            className={`rq-pd-opt-btn ${selectedColor === val ? "active" : ""}`}
                            onClick={() => setSelectedColor(val)}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Switcher */}
                <div className="rq-pd-opt-group">
                  <h4 className="rq-pd-label">Quantity</h4>
                  <div className="rq-pd-qty-box">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      aria-label="Reduce Quantity"
                    >
                      <FiMinus />
                    </button>
                    <span className="rq-qty-val">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      aria-label="Increase Quantity"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="rq-pd-note-field">
                  <label htmlFor="product-note">Add a Note (optional)</label>
                  <textarea
                    id="product-note"
                    rows="3"
                    value={productNote}
                    onChange={(e) => setProductNote(e.target.value)}
                    placeholder="Add any delivery or styling instructions..."
                  />
                </div>

                {/* Call to Action Buttons */}
                <div className="rq-pd-action-btns">
                  <button className="rq-cart-btn" onClick={handleAddToCart}>
                    <FiShoppingBag />
                    Add To Cart
                  </button>
                  <button className="rq-buy-btn" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>

                {/* Service Guarantees */}
                <div className="rq-pd-trust-grid">
                  <div>
                    <FiTruck />
                    <span>Nationwide Delivery</span>
                  </div>
                  <div>
                    <FiShield />
                    <span>Guaranteed Quality</span>
                  </div>
                  <div>
                    <FiRefreshCw />
                    <span>7-Day Exchange</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rq-pd-skeleton-card">
              <div className="rq-skeleton-media"></div>
              <div className="rq-skeleton-details"></div>
            </div>
          )}

          {/* Details & Story Tab System */}
          {product && (
            <div className="rq-pd-tabs-section">
              <div className="rq-pd-tabs-nav">
                <button
                  className={tab === "description" ? "active" : ""}
                  onClick={() => setTab("description")}
                >
                  Product Details
                </button>
                <button
                  className={tab === "details" ? "active" : ""}
                  onClick={() => setTab("details")}
                >
                  Specifications
                </button>
              </div>

              <div className="rq-pd-tab-panel">
                {tab === "description" && (
                  <p className="rq-tab-text">{product.description}</p>
                )}

                {tab === "details" && (
                  <div className="rq-details-table">
                    <div className="rq-table-row">
                      <span>Brand</span>
                      <strong>{product.brand || "RQ Wear"}</strong>
                    </div>
                    <div className="rq-table-row">
                      <span>SKU</span>
                      <strong>{product.sku || "N/A"}</strong>
                    </div>
                    <div className="rq-table-row">
                      <span>Availability</span>
                      <strong>{product.stock > 0 ? `${product.stock} In Stock` : "Out Of Stock"}</strong>
                    </div>
                    {product.category && (
                      <div className="rq-table-row">
                        <span>Category</span>
                        <strong>{product.category}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;