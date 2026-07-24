

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./FilterSidebar.css";

const FilterSidebar = ({
  categories = [],
  selectedCategory,
  selectedSeason,
  onCategoryChange,
  onSeasonChange,
  onShowAllProducts,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const collections = categories.length > 0
    ? categories.map((category) => ({
        value: category.slug || category.name,
        label: category.name,
        keywords: `${category.name} luxury clothing, premium ${category.name} wear`,
        subcategories: Array.isArray(category.subcategoryNames)
          ? category.subcategoryNames
              .filter(Boolean)
              .map((name) => ({
                label: name,
                value: `${category.slug || category.name}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              }))
          : [],
      }))
    : [];

  const handleCollectionToggle = (value, item) => {
    if (selectedCategory === value) {
      onCategoryChange?.("");
      setExpandedCategory(null);
    } else {
      onCategoryChange?.(value);
      if (item?.subcategories?.length) {
        setExpandedCategory(value);
      } else {
        setExpandedCategory(null);
      }
    }
  };

  const handleSubcategoryToggle = (value, parentValue) => {
    onCategoryChange?.(value);
    setExpandedCategory(parentValue);
  };

  const activeCollectionObj = collections.find((c) => c.value === selectedCategory);
  const currentSEOKeywords = activeCollectionObj
    ? activeCollectionObj.keywords
    : "womens stitched clothing, premium designer wear, ready to wear pakistani suits, stitched luxury pret";
  const dynamicTitle = selectedCategory
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
        <div className="filter-sidebar__header">
          <h3>Collections</h3>
          {(selectedCategory || selectedSeason) && (
            <button 
              type="button" 
              className="filter-sidebar__clear" 
              onClick={() => {
                onShowAllProducts?.();
                onCategoryChange?.("");
                onSeasonChange?.("");
                setExpandedCategory(null);
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-option-container">
            <label className={`filter-option ${!selectedCategory && !selectedSeason ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={!selectedCategory && !selectedSeason}
                onChange={() => {
                  onShowAllProducts?.();
                  onCategoryChange?.("");
                  onSeasonChange?.("");
                  setExpandedCategory(null);
                }}
              />
              <span>All Products</span>
            </label>
          </div>

          {collections.length > 0 ? (
            collections.map((item) => {
              const isChecked = selectedCategory === item.value || item.subcategories?.some((subItem) => selectedCategory === subItem.value);

              return (
                <div key={item.value} className="filter-option-container">
                  <label className={`filter-option ${isChecked ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCollectionToggle(item.value, item)}
                    />
                    <span>{item.label}</span>
                  </label>

                  {item.subcategories?.length > 0 && expandedCategory === item.value && (
                    <div className="filter-subgroup">
                      {item.subcategories.map((subItem) => {
                        const isSubChecked = selectedCategory === subItem.value;

                        return (
                          <label key={subItem.value} className={`filter-option filter-option--sub ${isSubChecked ? "active" : ""}`}>
                            <input
                              type="checkbox"
                              checked={isSubChecked}
                              onChange={() => handleSubcategoryToggle(subItem.value, item.value)}
                            />
                            <span>{subItem.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="filter-empty-state">No categories available yet.</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;