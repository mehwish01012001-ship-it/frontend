import React, { useEffect, useState } from "react";
import Seo from "../../components/SEO";
import {
  FiSearch,
  FiSliders,
  FiPackage,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

import {
  productService,
  categoryService,
} from "../../services";

import ProductCard from "../../components/ProductCard/ProductCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Added sizes, price range, and layout states for a premium store feel
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "newest",
    season: "",
    size: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories();
      setCategories(res?.data?.categories || []);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getAllProducts({
        limit: 24, // Sized for optimized desktop grid patterns
        search: filters.search,
        category: filters.category,
        season: filters.season,
        sort: filters.sort,
        size: filters.size,
      });

      setProducts(res?.data?.products || []);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Generate dynamic keywords for search bots based on current active filters
  const getDynamicKeywords = () => {
    const baseKeywords = "luxury stitched pret, premium womens wear, ready to wear dresses, designer stitched suits, boutique pret online";
    if (filters.category) return `${filters.category.toLowerCase()} pret, stitched ${filters.category.toLowerCase()}, ${baseKeywords}`;
    if (filters.season) return `${filters.season.toLowerCase()} collection, stitched pret, ${baseKeywords}`;
    return baseKeywords;
  };

  // Structured Schema.org JSON-LD data for rich search result cards
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "RQ Fashion Premium Womens Stitched Collection",
    "description": "Explore elegant, high-end ready-to-wear stitched luxury garments for women. Handcrafted pret wear, luxury coordinates, and formal stitched suits.",
    "url": window.location.href,
    "provider": {
      "@type": "Brand",
      "name": "RQ Fashion"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      <Seo
        title={filters.category ? `${filters.category} | RQ Fashion Stitched Pret` : "Luxury Womens Stitched Pret & Ready to Wear | RQ Fashion"}
        description={`Discover designer stitched women's outfits at RQ Fashion. Browse premium stitched clothing in our curated ${filters.category || 'seasonal'} luxury line. Elevate your wardrobe.`}
        keywords={getDynamicKeywords()}
        canonicalUrl={window.location.href}
        ogTitle="Luxury Womens Stitched Pret & Ready to Wear | RQ Fashion"
        ogDescription="Elegance stitched to perfection. Step into the world of luxury fabrics, modern silhouettes, and meticulous detailing."
        twitterCard="summary_large_image"
        schemaMarkup={structuredData}
      />

      <section className="lux-shop">

      {/* Decorative Brand Ambience Elements */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>

      {/* BRAND HERO ZONE */}
      <div className="lux-hero">
       
        <h1>
          RQ<span> Fashion</span>
        </h1>
        {/* <p className="hero-tagline">
          Elegance stitched to perfection. Explore structural cuts, masterfully tailored ready-to-wear pret, and opulent seasonal collections.
        </p> */}
      </div>

      <Breadcrumbs />

      {/* TOP FILTERS & SEARCH UTILITY BAR */}
      <div className="shop-topbar">
        <div className="search-box">
          <FiSearch className="icon-gold" />
          <input
            type="text"
            placeholder="Search premium apparel..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
          />
        </div>

        <div className="right-tools">
          <div className="count-box">
            <FiPackage className="icon-gold" />
            <span>{products.length} Masterpieces</span>
          </div>

          <div className="sort-box">
            <FiSliders className="icon-gold" />
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
            >
              <option value="newest">Latest Arrivals</option>
              <option value="popular">Highly Coveted</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT BODY */}
      <div className="shop-body">
        <FilterSidebar
          categories={categories}
          selectedCategory={filters.category}
          selectedSeason={filters.season}
          selectedSize={filters.size}
          onCategoryChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              category: val,
              season: "",
            }))
          }
          onSeasonChange={(season) =>
            setFilters((prev) => ({
              ...prev,
              season,
            }))
          }
          onSizeChange={(size) =>
            setFilters((prev) => ({
              ...prev,
              size,
            }))
          }
          onShowAllProducts={() =>
            setFilters((prev) => ({
              ...prev,
              search: "",
              category: "",
              sort: "newest",
              season: "",
              size: "",
            }))
          }
        />

        <div className="shop-products">
          {loading ? (
            <div className="lux-loader">
              <div className="loader-ring"></div>
              <p>Unveiling Luxury Collections...</p>
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FiAward className="empty-icon" />
                  <h3>No Products Found</h3>
                  <p>Refine your premium criteria or explore another elegant collection.</p>
                  <button 
                    className="reset-btn"
                    onClick={() => setFilters({
                      search: "",
                      category: "",
                      sort: "newest",
                      season: "",
                      size: "",
                    })}
                  >
                    View All Masterpieces
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Shop;