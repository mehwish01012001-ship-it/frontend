import React, { useState } from 'react';
import { orderService } from '../../services';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await orderService.trackOrder(orderNumber);
      setOrder(response.data.order);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to find order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page">
      <div className="track-order-card">
        <h1>Track Your Order</h1>
        <p>Enter your order number to check the delivery status.</p>

        <form className="track-order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order Number"
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {order && (
          <div className="tracking-result">
            <h2>Order #{order.orderNumber}</h2>
            <p>Status: <strong>{order.orderStatus}</strong></p>
            <p>Total: ${order.totalAmount?.toFixed(2)}</p>
            <div className="tracking-details">
              <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              {order.trackingNumber && <p><strong>Tracking #:</strong> {order.trackingNumber}</p>}
              {order.shippingCarrier && <p><strong>Carrier:</strong> {order.shippingCarrier}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
