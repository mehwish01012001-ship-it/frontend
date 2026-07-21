import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // For SEO Optimization
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLogOut,
  FiCamera,
  FiLock,
  FiShoppingBag,
  FiMapPin,
  FiSave,
} from "react-icons/fi";

import { authService, orderService } from "../../services";
import { getMediaUrl } from "../../services/api";
import { clearUser, setUser } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { clearWishlist } from "../../redux/slices/wishlistSlice";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  // Synchronize state when user data is retrieved from Redux store
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await orderService.getMyOrders();
      setOrders(response?.data?.orders || []);
    } catch (error) {
      console.error("Error fetching real-time order history:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Direct update to local preview
    setAvatarPreview(URL.createObjectURL(file));

    // Prepare Multipart Form Data for Backend upload API
    const uploadData = new FormData();
    uploadData.append("avatar", file);

    try {
      const response = await authService.updateAvatar(uploadData);
      const updatedUser = response?.data?.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        setAvatarPreview(updatedUser.avatar || URL.createObjectURL(file));
      }
    } catch (err) {
      console.error("Failed to sync uploaded image to the server", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);
    setMessage("");

    try {
      const response = await authService.updateProfile(formData);
      const updatedUser = response?.data?.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        setFormData({
          firstName: updatedUser.firstName || "",
          lastName: updatedUser.lastName || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
          address: updatedUser.address || "",
        });
        setAvatarPreview(updatedUser.avatar || null);
      }
      if (response?.data) {
        setMessage("Your profile details have been successfully updated.");
      }
    } catch (err) {
      setIsError(true);
      setMessage(
        err?.response?.data?.message || "Failed to update profile information."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setIsError(true);
      setMessage("New password and confirmation password do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setMessage("Password updated successfully.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setIsError(true);
      setMessage(
        err?.response?.data?.message || "Password update transaction failed."
      );
    } finally {
      setPasswordLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/login");
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  // Structured SEO Metadata
  const seoData = {
    title: `${user?.firstName ? `${user.firstName}'s` : "My"} Profile | Luxurious Stitched Women's Fashion`,
    description: "Manage your premium stitched apparel orders, update shipment addresses, change profile details, and keep track of your luxury designer pret purchases.",
    canonical: window.location.href,
  };

  // Profile completion calculation based on existing fields
  const calculateCompletion = () => {
    const fields = [formData.firstName, formData.lastName, formData.phone, formData.address, avatarPreview];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="profile-page">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content="luxury pret, stitched womenswear, premium lawn, designer chiffon pret, pret profile, womens clothing, luxury fashion account" />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="profile" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
      </Helmet>

      <div className="profile-bg-glow-1"></div>
      <div className="profile-bg-glow-2"></div>

      <div className="profile-wrapper">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="avatar-ring">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile Avatar"
                className="avatar-image"
              />
            ) : (
              <div className="avatar">
                {formData.firstName?.charAt(0) || "U"}
              </div>
            )}

            <label className="upload-btn" aria-label="Upload profile image">
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          <h3 className="profile-name">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="profile-email">{formData.email}</p>

          <div className="profile-nav">
            <button
              type="button"
              className={`nav-pill ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser />
              Personal Details
            </button>

            <button
              type="button"
              className={`nav-pill ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FiShoppingBag />
              Order History
            </button>
          </div>

          <div className="profile-progress">
            <div className="progress-header">
              <span>Account Setup</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            type="button"
          >
            <FiLogOut />
            Sign Out
          </button>
        </aside>

        {/* MAIN INTERACTIVE CONTENT */}
        <main className="profile-content">
          {message && (
            <div className={`status-feedback-box ${isError ? "error" : "success"}`}>
              {message}
            </div>
          )}

          {activeTab === "profile" ? (
            <>
              <h2 className="section-title">Personal Details</h2>
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="input-box">
                  <FiUser />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box">
                  <FiUser />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box disabled">
                  <FiMail />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="input-box">
                  <FiPhone />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box full-width">
                  <FiMapPin />
                  <input
                    type="text"
                    name="address"
                    placeholder="Primary Shipping Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="save-btn full-width"
                  disabled={loading}
                >
                  <FiSave />
                  {loading ? "Saving Records..." : "Update Portfolio Details"}
                </button>
              </form>

              <div className="password-card">
                <h3>
                  <FiLock />
                  Security Configuration
                </h3>

                <form onSubmit={handlePasswordSubmit} className="profile-form">
                  <div className="input-box">
                    <FiLock />
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      required
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="input-box">
                    <FiLock />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Secure Password"
                      required
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="input-box">
                    <FiLock />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="save-btn"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? "Securing..." : "Change Account Credentials"}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h2 className="section-title">Order History Portfolio</h2>

              <div className="orders-container">
                {ordersLoading ? (
                  <div className="orders-loading-skeleton">
                    <div className="spinner"></div>
                    <p>Retrieving authentic purchase details...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="orders-empty-state">
                    <FiShoppingBag className="empty-state-icon" />
                    <h4>Your Wardrobe is Awaiting</h4>
                    <p>Discover our newest collections of premium hand-stitched ensembles designed for timeless grace.</p>
                    <button onClick={() => navigate("/shop")} className="shop-collection-btn">
                      Browse New Arrivals
                    </button>
                  </div>
                ) : (
                  <div className="orders-matrix-list">
                    {orders.map((order) => {
                      const isExpanded = expandedOrderId === order._id;
                      return (
                        <div key={order._id} className={`premium-order-invoice-card ${isExpanded ? "expanded" : ""}`}>
                          <button
                            type="button"
                            className="order-accordion-header"
                            onClick={() => toggleOrderDetails(order._id)}
                          >
                            <div className="invoice-header">
                              <div>
                                <span className="invoice-id">No. {order.orderNumber}</span>
                                <span className="invoice-date">
                                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="header-actions">
                                <span className={`status-tag ${String(order.orderStatus || "pending").toLowerCase()}`}>
                                  {order.orderStatus || "Pending Approval"}
                                </span>
                                <span className={`accordion-toggle ${isExpanded ? "open" : ""}`}>▾</span>
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="order-accordion-body">
                              <div className="order-meta-grid">
                                <div className="order-address-card">
                                  <h4>Shipping Details</h4>
                                  <p>{order.shippingAddress?.fullName}</p>
                                  <p>{order.shippingAddress?.addressLine1}</p>
                                  {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                  <p>
                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                                  </p>
                                  <p>{order.shippingAddress?.country}</p>
                                  <p>Phone: {order.shippingAddress?.phone}</p>
                                </div>
                                <div className="order-payment-card">
                                  <h4>Payment</h4>
                                  <p>{String(order.paymentMethod || "Unknown").replace(/_/g, " ")}</p>
                                  <p>Payment Status: {order.paymentStatus || "pending"}</p>
                                  {order.paymentNumber && <p>Account/Wallet: {order.paymentNumber}</p>}
                                </div>
                              </div>

                              <div className="invoice-goods">
                                {(order.items || []).map((item, index) => (
                                  <Link
                                    to={`/product/${item.product?.slug || item.product?._id}`}
                                    key={`${order._id}-${index}`}
                                    className="goods-item-row order-product-link"
                                  >
                                    <div className="order-product-image-wrapper">
                                      <img
                                        src={getMediaUrl(item.product?.images?.[0]?.url)}
                                        alt={item.product?.name || "Ordered Product"}
                                      />
                                    </div>

                                    <div className="order-product-details">
                                      <span className="item-title">
                                        {item.product?.name || `Ordered Product ${index + 1}`}
                                      </span>
                                      <span className="item-meta">
                                        Qty {item.quantity || 1}
                                        {item.size ? ` • Size: ${item.size}` : ""}
                                        {item.color ? ` • Color: ${item.color}` : ""}
                                      </span>
                                    </div>

                                    <span className="item-qty">
                                      Rs. {(((item.product?.price || item.price || 0) * (item.quantity || 1))).toFixed(2)}
                                    </span>
                                  </Link>
                                ))}
                              </div>

                              <div className="invoice-footer">
                                <span>Grand Investment</span>
                                <span className="grand-total">
                                  Rs. {Number(order.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;