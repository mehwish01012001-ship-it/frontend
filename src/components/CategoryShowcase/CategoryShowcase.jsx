import React from 'react';
import './CategoryShowcase.css';

const CategoryShowcase = ({ categories = [] }) => {
  return (
    <section className="category-showcase container">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {(categories.length > 0 ? categories : [{}, {}, {}, {}, {}, {}]).map((cat, idx) => (
          <div key={idx} className="category-item">
            <img src={cat.image || '/placeholder.jpg'} alt={cat.name || 'Category'} />
            <h3>{cat.name || 'Category'}</h3>
            <a href={cat.link || '#'}>Shop</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
