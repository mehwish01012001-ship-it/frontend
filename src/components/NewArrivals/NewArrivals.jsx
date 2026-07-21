import React, { useEffect, useState } from "react";
import { productService } from "../../services";
import ProductCard from "../ProductCard/ProductCard";
import "./NewArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getNewArrivals();
        setProducts(response?.data?.products || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <section className="new-arrivals-section">
      <div className="floating-circle circle-1"></div>
      <div className="floating-circle circle-2"></div>
      <div className="floating-circle circle-3"></div>

      <div className="container">
        <div className="section-header">
         

          <h2>
            New <span>Arrivals</span>
          </h2>

          <p>
            Discover our latest fashion collection crafted with premium quality
            and modern luxury styling.
          </p>
        </div>

        <div className="products-grid">
          {loading ? (
            <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              <p>Loading new arrivals...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              <p>Error: {error}</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="product-wrapper" key={product._id}>
                <div className="new-badge">NEW</div>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              <p>No new arrivals available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;