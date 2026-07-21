

import React from "react";
import { Helmet } from "react-helmet-async"; // Used for dynamic SEO injections
import "./FilterSidebar.css";

/**
 * FilterSidebar Component
 * 
 * A premium, dynamic navigation panel designed for an upscale women's stitched fashion store.
 * Handles collection-based filtering for the storefront.
 * 
 * @param {string} selectedSeason - Current active season ("summer", "winter", etc.)
 * @param {function} onSeasonChange - Parent handler when a season selection updates
 * @param {function} onShowAllProducts - Resets all active filters
 */
const FilterSidebar = ({
  selectedSeason,
  onSeasonChange,
  onShowAllProducts,
}) => {
  // Collections represent the primary parental taxonomies
  const collections = [
    { value: "summer", label: "Summer Collection", keywords: "luxury summer lawn, stitched summer wear, women lawn suits" },
    { value: "winter", label: "Winter Collection", keywords: "premium velvet suits, stitched winter khaddar, warm women wear" },
  ];


  // Handles checking/unchecking of the primary seasonal collections
  const handleCollectionToggle = (value) => {
    if (selectedSeason === value) {
      onSeasonChange?.("");
    } else {
      onSeasonChange?.(value);
    }
  };

  // Dynamically configure SEO keywords and titles depending on active selection
  const activeCollectionObj = collections.find(c => c.value === selectedSeason);
  const currentSEOKeywords = activeCollectionObj 
    ? activeCollectionObj.keywords 
    : "womens stitched clothing, premium designer wear, ready to wear pakistani suits, stitched luxury pret";
  const dynamicTitle = selectedSeason 
    ? `Designer ${activeCollectionObj?.label} | Premium Stitched Clothing` 
    : "Shop Stitched Women's Luxury Pret & Collections";



  return (
    <>
      {/* 
        Dynamic SEO injection using React Helmet.
        Ensures search engines index the collection views correctly.
      */}
      <Helmet>
        <title>{dynamicTitle}</title>
        <meta name="description" content={`Explore our exclusive, masterfully curated range of stitched luxury garments. Shop elite ${selectedSeason || "seasonal"} designer-wear tailored to perfection.`} />
        <meta name="keywords" content={currentSEOKeywords} />
        
        {/* Open Graph / Facebook Metadata */}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content="Immerse yourself in custom embroidered, ready-to-wear women's garments designed with high-quality fabrics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content="Discover premium stitched clothing tailored exclusively for women's sophisticated style profiles." />
      </Helmet>

      <aside className="filter-sidebar">
        {/* Header Block */}
        <div className="filter-sidebar__header">
          <h3>Collections</h3>
          {(selectedSeason) && (
            <button 
              type="button" 
              className="filter-sidebar__clear" 
              onClick={() => {
                onShowAllProducts?.();
                onSeasonChange?.("");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Parent Collections Selection Area */}
        <div className="filter-group">
          {collections.map((item) => {
            const isChecked = selectedSeason === item.value;

            return (
              <div key={item.value} className="filter-option-container">
                <label className={`filter-option ${isChecked ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCollectionToggle(item.value)}
                  />
                  <span>{item.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;