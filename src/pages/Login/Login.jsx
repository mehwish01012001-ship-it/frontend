import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
FiMail,
FiLock,
FiEye,
FiEyeOff
} from "react-icons/fi";

import { authService } from "../../services";
import { setUser } from "../../redux/slices/authSlice";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import "./Login.css";

const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const { fetchWishlist } = useWishlist();
const { fetchCart } = useCart();

const [showPassword,setShowPassword] = useState(false);

const [formData,setFormData] = useState({
email:"",
password:"",
});

const [loading,setLoading] = useState(false);
const [error,setError] = useState("");

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await authService.login(formData);

    localStorage.setItem("token", response.data.token);

    dispatch(setUser(response.data.user));

    await fetchWishlist();
    await fetchCart();

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};

return ( <div className="login-page">

  <div className="floating blob1"></div>
  <div className="floating blob2"></div>

  <div className="login-card">

    <span className="badge">
      RQ FASHION
    </span>

    <div className="card-top">
      <h1>Welcome Back</h1>
      <p>
        Login to access your luxury account
      </p>
    </div>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    <form
      className="login-form"
      onSubmit={handleSubmit}
    >

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
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <span
          className="eye"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
        >
          {
            showPassword
            ? <FiEyeOff />
            : <FiEye />
          }
        </span>
      </div>

      <div className="login-options">

        <label className="remember">
          <input type="checkbox" />
          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="forgot-password"
        >
          Forgot Password?
        </Link>

      </div>

      <button
        className="login-btn"
        disabled={loading}
      >
        {
          loading
          ? "Signing In..."
          : "Sign In"
        }
      </button>

    </form>

    <div className="bottom-text">
      Don't have an account?

      <Link to="/register">
        Create Account
      </Link>
    </div>

  </div>

</div>

);
};

export default Login;
