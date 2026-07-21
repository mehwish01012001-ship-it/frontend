

import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../ProductCard/ProductCard";
import "./FlashSale.css";

const FlashSale = ({ products = [], endDate }) => {
  // Calculate remaining time against target end date to avoid drift
  const calculateTimeLeft = useMemo(() => {
    return () => {
      if (!endDate) {
        return { hours: 0, minutes: 0, seconds: 0, isExpired: false };
      }

      const difference = +new Date(endDate) - +new Date();
      let timeLeft = { hours: 0, minutes: 0, seconds: 0, isExpired: false };

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false
        };
      } else {
        timeLeft.isExpired = true;
      }

      return timeLeft;
    };
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!endDate) {
      setTimeLeft(calculateTimeLeft());
      return;
    }

    const timer = setInterval(() => {
      const calculated = calculateTimeLeft();
      setTimeLeft(calculated);

      if (calculated.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, calculateTimeLeft]);

  // Dynamically generate structured schema markup for SEO
  const structuredSchema = useMemo(() => {
    if (!products.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "image": product.images?.[0] || product.image,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD", // Replace with your default brand currency
            "price": product.salePrice || product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": endDate
          }
        }
      }))
    };
  }, [products, endDate]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="flash-sale-section" aria-label="Limited Time Flash Sale">
      {/* Dynamic SEO Meta Injection */}
      <Helmet>
        <title>Limited Time Flash Sale | Premium Women's Stitched Clothing</title>
        <meta name="description" content="Shop luxury women's stitched ensembles, designer pret, and formal ready-to-wear dresses at exclusive, limited-time prices. Offers end soon." />
        <meta name="keywords" content="designer stitched suits, ready to wear pret, luxury pakistani suits, stitched linen, premium silk pret, women boutique online" />
        
        {/* Open Graph / Social Tags */}
        <meta property="og:title" content="Limited Time Flash Sale | Luxury Women's Stitched Pret" />
        <meta property="og:description" content="Elevate your wardrobe with premium stitched outfits. Unmatched quality, designer tailoring, available at limited-time values." />
        <meta property="og:type" content="website" />
        
        {/* Rich Snippets */}
        {structuredSchema && (
          <script type="application/ld+json">
            {JSON.stringify(structuredSchema)}
          </script>
        )}
      </Helmet>

      {/* Decorative Orbs */}
      <div className="ambient-glow orb-left" aria-hidden="true" />
      <div className="ambient-glow orb-right" aria-hidden="true" />

      <div className="flash-sale-container">
        <header className="flash-sale-header">
          <div className="header-text-block">
            {/* <span className="sale-pill">LIMITED PIECES</span> */}
            <h2 className="header-title">
              Flash <span className="highlight-text">Sale</span>
            </h2>
            <p className="header-subtitle">
Discover refined fashion pieces crafted for timeless elegance. Limited quantities available, and once sold out, they will not return.

            </p>
          </div>
        </header>

        <div className="products-grid-layout">
          {products.map((product) => (
            <div className="grid-item-wrapper" key={product._id || product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;