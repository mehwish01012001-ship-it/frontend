import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    window.scrollTo(0, 0);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(orderId);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading order details...</div>;

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {order && (
          <div className="order-details">
            <div className="detail-row">
              <span>Order Number:</span>
              <strong>{order.orderNumber}</strong>
            </div>
            <div className="detail-row">
              <span>Order Date:</span>
              <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
            </div>
            <div className="detail-row">
              <span>Total Amount:</span>
              <strong>${order.totalAmount?.toFixed(2)}</strong>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <strong>{order.orderStatus}</strong>
            </div>
          </div>
        )}

        <div className="order-actions">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>

        <p className="confirmation-email">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
