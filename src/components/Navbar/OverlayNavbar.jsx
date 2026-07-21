import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./OverlayNavbar.css";

const OverlayNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce(
      (count, item) => count + (item.quantity || 0),
      0
    )
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`premium-navbar ${
          scrolled ? "navbar-scrolled" : ""
        } ${menuOpen ? "navbar-hidden-behind-sidebar" : ""}`}
      >
        {/* Dynamic Electric Accent Line */}
        <div className="navbar-glow-line" />
        
        <div className="navbar-container">
          {/* LEFT: INTERACTIVE ANIMATED MENU TRIGGER */}
          <div className="nav-section left-section">
            <button
              className={`electric-menu-trigger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="burger-line line-1"></span>
              <span className="burger-line line-2"></span>
              <span className="burger-line line-3"></span>
            </button>
          </div>

          {/* CENTER: CUSTOM HIGH-END KINETIC LOGO */}
          <div className="nav-section center-section">
            <Link to="/" className="premium-logo-link">
              <div className="logo-text-wrapper">
                <span className="logo-brand">RQ</span>
                <span className="logo-subtext">FASHION</span>
              </div>
              <div className="logo-electric-underline"></div>
            </Link>
          </div>

          {/* RIGHT: ELECTRIC ACTIONS & ACTIVE STATE PULSING BADGES */}
          <div className="nav-section right-section">
            <button className="electric-action-btn" aria-label="Search">
              <FiSearch className="btn-icon" />
              <span className="btn-glow-layer"></span>
            </button>

            <Link to="/wishlist" aria-label="Wishlist" className="electric-action-link">
              <FiHeart className="btn-icon" />
              {wishlistCount > 0 && (
                <span className="electric-badge pulse-effect">{wishlistCount}</span>
              )}
              <span className="btn-glow-layer"></span>
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className={`electric-action-link ${cartCount > 0 ? 'cart-active-electric' : ''}`}
            >
              <FiShoppingCart className="btn-icon" />
              {cartCount > 0 && (
                <span className="electric-badge high-voltage">{cartCount}</span>
              )}
              <span className="btn-glow-layer"></span>
            </Link>
          </div>
        </div>
      </header>

      {/* ULTRA SMOOTH ATMOSPHERIC BACKDROP */}
      {menuOpen && (
        <div className="electric-backdrop" onClick={closeMenu} />
      )}

      {/* PREMIUM STAGGER-ANIMATED SIDEBAR */}
      <aside className={`electric-sidebar ${menuOpen ? "sidebar-visible" : ""}`}>
        <div className="sidebar-inner">
          
          <div className="sidebar-header">
            <div className="sidebar-title-wrap">
              <span className="sidebar-accent-indicator"></span>
              <h3>NAVIGATION</h3>
            </div>
            <button
              className="sidebar-close-btn"
              onClick={closeMenu}
              aria-label="Close Menu"
            >
              <FiX />
            </button>
          </div>

          <nav className="sidebar-nav-links">
            {[
              { path: "/", label: "Home" },
              { path: "/shop", label: "Shop" },
              { path: "/about", label: "Our Story" },
              { path: "/contact", label: "Contact Us" },
              { path: isAuthenticated ? "/profile" : "/login", label: isAuthenticated ? "Profile" : "Sign-In" }
            ].map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                onClick={closeMenu}
                style={{ "--nav-index": index }}
                className="animated-nav-item"
              >
                <span className="link-number">0{index + 1}</span>
                <span className="link-text">{link.label}</span>
                <FiArrowRight className="link-arrow-icon" />
              </Link>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="footer-actions-grid">
              <Link to="/wishlist" onClick={closeMenu} className="grid-action-card">
                <FiHeart />
                <span>Favorites</span>
                {wishlistCount > 0 && <span className="mini-badge">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" onClick={closeMenu} className="grid-action-card active-card">
                <FiShoppingCart />
                <span>Checkout</span>
                {cartCount > 0 && <span className="mini-badge">{cartCount}</span>}
              </Link>
            </div>
            <p className="sidebar-copyright">© 2026 RQ FASHION. All Rights Reserved.</p>
          </div>

        </div>
      </aside>
    </>
  );
};

export default OverlayNavbar;