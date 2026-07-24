import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import useCompare from '../../hooks/useCompare';
import { useCompareActions } from '../../hooks/useCompareActions';
import { getMediaUrl } from '../../services/api';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './CompareProducts.css';

const CompareProducts = () => {
  const navigate = useNavigate();
  const { compareItems } = useCompare();
  const { fetchCompareItems, removeFromCompare } = useCompareActions();

  useEffect(() => {
    fetchCompareItems();
  }, [fetchCompareItems]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCompare(productId);
    } catch (error) {
      // error handled by hook
    }
  };

  return (
    <div className="compare-products-page container">
      <Breadcrumbs />
      <div className="compare-header">
        <div className="compare-header-top">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>
          <h1>Compare Products</h1>
        </div>
        <p>Compare selected items side by side to find the perfect fit for your style.</p>
      </div>

      {compareItems.length === 0 ? (
        <div className="compare-empty">
          <p>You have not added any products to compare yet.</p>
          <Link to="/shop" className="compare-action-link">
            Browse products to compare
          </Link>
        </div>
      ) : (
        <div className="compare-table-wrapper">
          <div className="compare-table">
            {compareItems.map((product) => (
              <div key={product._id || product.id} className="compare-card">
                <img
                  src={getMediaUrl(product.images?.[0]?.url || product.image || product.thumbnail || '')}
                  alt={product.name}
                />
                <div className="compare-card-content">
                  <h2>{product.name}</h2>
                  <p className="compare-brand">{product.brand || 'Luxury Collection'}</p>
                  <div className="compare-pricing">
                    <span className="compare-current">Rs. {Number(product.price).toFixed(2)}</span>
                    {product.comparePrice > product.price && (
                      <span className="compare-old">Rs. {Number(product.comparePrice).toFixed(2)}</span>
                    )}
                  </div>
                  <p>{product.description?.slice(0, 100)}...</p>
                  <div className="compare-actions">
                    <button onClick={() => handleRemove(product._id)}>
                      <FiTrash2 /> Remove
                    </button>
                    <button onClick={() => navigate(`/product/${product.slug || product._id}`)}>
                      <FiShoppingBag /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareProducts;
