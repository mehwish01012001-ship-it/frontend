import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './BestSellers.css';

const BestSellers = () => {
  const products = [
    { id: 1, name: 'Best Seller 1', price: 249, rating: 4.8, image: '/product-1.jpg' },
    { id: 2, name: 'Best Seller 2', price: 299, rating: 4.9, image: '/product-2.jpg' },
    { id: 3, name: 'Best Seller 3', price: 279, rating: 4.7, image: '/product-3.jpg' },
    { id: 4, name: 'Best Seller 4', price: 329, rating: 4.8, image: '/product-4.jpg' },
  ];

  return (
    <section className="best-sellers container">
      <h2>Best Sellers</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
