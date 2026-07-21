import React, { useEffect, useState } from 'react';
import { orderService } from '../../services';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getMyOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800';
      case 'processing':
        return '#2196f3';
      case 'shipped':
        return '#4caf50';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999999';
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.product?.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>Rs. {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                    <div className="order-total">
                    <strong>Total: Rs. {order.totalAmount?.toFixed(2)}</strong>
                  </div>
                  {order.trackingNumber && (
                    <div className="tracking">
                      <strong>Tracking:</strong> {order.trackingNumber}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
