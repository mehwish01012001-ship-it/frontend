import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";

import { authService } from "../../services";
import { setUser } from "../../redux/slices/authSlice";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchWishlist } = useWishlist();
  const { fetchCart } = useCart();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = () => {
    const pass = formData.password;

    if (pass.length < 6) return "Weak";
    if (
      pass.match(/[A-Z]/) &&
      pass.match(/[0-9]/) &&
      pass.length >= 8
    )
      return "Strong";

    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);

      dispatch(setUser(response.data.user));

      await fetchWishlist();
      await fetchCart();

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="floating blob1"></div>
      <div className="floating blob2"></div>

      <div className="register-card">

        <div className="card-top">
          <span className="badge">
            Luxury Fashion
          </span>

          <h1>Create Account</h1>

          <p>
            Join our premium fashion community
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <div className="form-row">

            <div className="input-box">
              <FiUser />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FiUser />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="input-box">
            <FiMail />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FiLock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </span>
          </div>

          {formData.password && (
            <div
              className={`strength ${passwordStrength().toLowerCase()}`}
            >
              {passwordStrength()}
            </div>
          )}

          <div className="input-box">
            <FiLock />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </span>
          </div>

          <button
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <div className="bottom-text">
          Already have an account?

          <Link to="/login">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;