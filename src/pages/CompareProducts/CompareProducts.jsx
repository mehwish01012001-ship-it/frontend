import React from 'react';
import './CompareProducts.css';

const CompareProducts = () => {
  return (
    <div className="compare-products-page container">
      <div className="compare-header">
        <h1>Compare Products</h1>
        <p>Compare selected items side by side to find the perfect fit for your style.</p>
      </div>
      <div className="compare-grid">
        <div className="compare-card">Select products to compare.</div>
        <div className="compare-card">Add products from the shop page.</div>
        <div className="compare-card">View prices, availability, and features.</div>
      </div>
    </div>
  );
};

export default CompareProducts;
