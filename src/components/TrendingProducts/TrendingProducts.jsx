import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './TrendingProducts.css';

const TrendingProducts = () => {
  const products = [
    { id: 1, name: 'Trending Item 1', price: 299, trend: 'Hot', image: '/product-1.jpg' },
    { id: 2, name: 'Trending Item 2', price: 349, trend: 'Hot', image: '/product-2.jpg' },
    { id: 3, name: 'Trending Item 3', price: 279, trend: 'New', image: '/product-3.jpg' },
    { id: 4, name: 'Trending Item 4', price: 329, trend: 'Hot', image: '/product-4.jpg' },
  ];

  return (
    <section className="trending-products container">
      <h2>Trending Now</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
