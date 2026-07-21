import React, { useState } from 'react';
import './ShippingCalculator.css';

const ShippingCalculator = ({ onCalculate = () => {} }) => {
  const [zipCode, setZipCode] = useState('');
  const [method, setMethod] = useState('standard');

  const handleCalculate = () => {
    if (zipCode) {
      onCalculate({ zipCode, method });
    }
  };

  return (
    <div className="shipping-calculator">
      <h3>Calculate Shipping</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option value="standard">Standard Shipping - Rs. 5.00</option>
          <option value="express">Express Shipping - Rs. 15.00</option>
          <option value="overnight">Overnight - Rs. 30.00</option>
        </select>
      </div>
      <button onClick={handleCalculate} className="btn-calculate">Calculate</button>
    </div>
  );
};

export default ShippingCalculator;
