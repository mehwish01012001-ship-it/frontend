import React from 'react';
import './Addresses.css';

const Addresses = () => {
  return (
    <div className="addresses-page container">
      <div className="address-header">
        <h1>My Addresses</h1>
        <p>Manage shipping and billing addresses for faster checkout.</p>
      </div>
      <div className="address-list">
        <div className="address-card">
          <h2>Home Address</h2>
          <p>123 Fashion Avenue</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
        </div>
        <div className="address-card">
          <h2>Work Address</h2>
          <p>456 Style Street</p>
          <p>Los Angeles, CA 90028</p>
          <p>United States</p>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
