
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "bank_account",
    paymentNumber: "1234567890123",
    paymentReceipt: null,
    notes: "",
    coupon: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'paymentMethod') {
      const defaults = {
        bank_account: '1234567890123',
        jazzcash: '09876543211',
        easypaisa: '11111111111',
        other_bank: '',
        cash_on_delivery: '',
      };

      setFormData((prev) => ({
        ...prev,
        paymentMethod: value,
        paymentNumber: defaults[value] || '',
      }));
      return;
    }

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = new FormData();
      const orderItems = items.map((item) => ({
        product: item.product?._id || item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product?.price || item.price,
      }));

      payload.append('items', JSON.stringify(orderItems));
      const shippingAddress = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        addressLine1: formData.address,
        addressLine2: formData.addressLine2 || '',
        city: formData.city,
        state: formData.state || '',
        zipCode: formData.postalCode,
        country: formData.country,
      };

      payload.append('shippingAddress', JSON.stringify(shippingAddress));
      payload.append('billingAddress', JSON.stringify(shippingAddress));
      payload.append('paymentMethod', formData.paymentMethod);
      payload.append('paymentNumber', formData.paymentNumber);
      payload.append('notes', formData.notes);
      if (formData.coupon) {
        payload.append('coupon', formData.coupon);
      }
      if (formData.paymentReceipt) {
        payload.append('paymentReceipt', formData.paymentReceipt);
      }

      const response = await orderService.createOrder(payload);

      navigate(`/order-success/${response.data.order._id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = total || 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-header">
          <h1>Luxury Checkout</h1>
          <p>Complete your order securely</p>
        </div>

        <div className="checkout-progress">

          <div className="step active">
            <span>1</span>
            <p>Cart</p>
          </div>

          <div className="line active"></div>

          <div className="step active">
            <span>2</span>
            <p>Checkout</p>
          </div>

          <div className="line"></div>

          <div className="step">
            <span>3</span>
            <p>Success</p>
          </div>

        </div>

        <div className="checkout-layout">

          <form className="checkout-form" onSubmit={handleSubmit}>

            <section className="glass-card">

              <h2>Shipping Information</h2>

              <div className="form-row">

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State / Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </section>

            <section className="glass-card">


              <div className="payment-grid">
                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    className="payment-select"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="bank_account">Bank Account</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                    <option value="other_bank">Other Bank</option>
                  </select>
                </div>
                <div className="form-group payment-number-group">
                  <label htmlFor="paymentNumber">Account / Wallet Number</label>
                  <div className="payment-number-row">
                    <input
                      id="paymentNumber"
                      name="paymentNumber"
                      value={formData.paymentNumber}
                      onChange={handleChange}
                      placeholder="Enter account number"
                      readOnly={formData.paymentMethod !== 'other_bank'}
                    />
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={() => navigator.clipboard?.writeText(formData.paymentNumber)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="paymentReceipt">Payment Receipt</label>
                <div className="receipt-upload-box">
                  <input
                    type="file"
                    id="paymentReceipt"
                    name="paymentReceipt"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <p>Upload a screenshot or photo of your payment receipt.</p>
                  {formData.paymentReceipt && (
                    <p className="receipt-file-name">Selected: {formData.paymentReceipt.name}</p>
                  )}
                </div>
              </div>

              <div className="secure-box">
                🔒 SSL Secured Checkout
              </div>

            </section>

            <section className="glass-card">

              <h2>Additional Notes</h2>

              <textarea
                name="notes"
                rows="4"
                placeholder="Write your delivery instructions..."
                value={formData.notes}
                onChange={handleChange}
              />

            </section>

            <button
              className="luxury-btn"
              disabled={loading}
              type="submit"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

          </form>

          <aside className="order-summary">

            <div className="summary-badge">
              Premium Order
            </div>

            <h2>Order Summary</h2>

            <div className="summary-items">

              {items.map((item) => (
                <div key={item._id} className="summary-item">

                  <div>
                    <h4>{item.product?.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <span>
                      Rs. {(((item.product?.price || item.price) * item.quantity)).toFixed(2)}
                  </span>

                </div>
              ))}

            </div>

            <div className="coupon-box">

              <input
                type="text"
                placeholder="Coupon Code"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
              />

              <button type="button">
                Apply
              </button>

            </div>

            <div className="totals">

              <div>
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div>
                <span>Shipping</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </div>

              <div>
                <span>Tax</span>
                <span>Rs. {tax.toFixed(2)}</span>
              </div>

              <div className="grand-total">
                <span>Total</span>
                <span>Rs. {orderTotal.toFixed(2)}</span>
              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
};

export default Checkout;