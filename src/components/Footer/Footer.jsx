// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-grid">
//           {/* Brand Section */}
//           <div className="footer-section">
//             <h3>RQ FASHION</h3>
//             <p>Premium luxury fashion for the modern individual. Discover our exclusive collections of high-end clothing, accessories, and more.</p>
//             <div className="social-icons">
//               <a href="#" title="Facebook"><FiFacebook /></a>
//               <a href="#" title="Instagram"><FiInstagram /></a>
//               <a href="#" title="Twitter"><FiTwitter /></a>
//               <a href="#" title="LinkedIn"><FiLinkedin /></a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><Link to="/shop">Shop All</Link></li>
//               <li><Link to="/categories">Categories</Link></li>
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/contact">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div className="footer-section">
//             <h4>Customer Service</h4>
//             <ul>
//               <li><Link to="/faq">FAQ</Link></li>
//               <li><Link to="/privacy-policy">Privacy Policy</Link></li>
//               <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
//               <li><a href="mailto:support@rqfashion.com">Email Support</a></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="footer-section">
//             <h4>Newsletter</h4>
//             <p>Subscribe to get exclusive offers and updates.</p>
//             <div className="newsletter-input">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//               />
//               <button>Subscribe</button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="footer-bottom">
//           <p>&copy; 2024 RQ Fashion. All rights reserved.</p>
//           <p>Designed & Developed with ♡ for Fashion Enthusiasts</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const location = useLocation();

  // Dynamic SEO Injection for Search Crawlers
  useEffect(() => {
    const currentUrl = window.location.href;
    
    // Update Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // Inject Structured Data (Organization & eCommerce Schema)
    const schemaId = 'rq-fashion-organization-schema';
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      "@id": "https://rqfashion.com/#store",
      "name": "RQ FASHION",
      "url": "https://rqfashion.com",
      "logo": "https://rqfashion.com/logo.png",
      "description": "Premium luxury women's stitched clothing and high-end pret collections.",
      "sameAs": [
        "https://facebook.com/rqfashion",
        "https://instagram.com/rqfashion",
        "https://twitter.com/rqfashion",
        "https://linkedin.com/company/rqfashion"
      ]
    };

    schemaScript.text = JSON.stringify(organizationSchema);
  }, [location]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      // Direct production-ready API integration line
      const response = await fetch('/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Successfully subscribed to updates.' });
        setEmail('');
      } else {
        const errorData = await response.json();
        setStatus({ type: 'error', message: errorData.message || 'Subscription failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network connection issue. Please try again.' });
    }
  };

  return (
    <footer className="luxury-footer">
      <div className="luxury-footer-container">
        <div className="luxury-footer-grid">
          
          {/* Identity & Corporate Section */}
          <div className="luxury-footer-section identity-block">
            <h3 className="brand-title">RQ FASHION</h3>
            <div className="social-links-wrapper">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RQ Fashion on Facebook" className="social-icon-link"><FiFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RQ Fashion on Instagram" className="social-icon-link"><FiInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RQ Fashion on Twitter" className="social-icon-link"><FiTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RQ Fashion on LinkedIn" className="social-icon-link"><FiLinkedin /></a>
            </div>
          </div>

          <div className="footer-link-groups">
            {/* Navigation Matrix */}
            <div className="luxury-footer-section">
              <h4 className="section-title">Collections</h4>
              <ul className="footer-links-list">
                <li><Link to="/shop" className="animated-link">Shop All</Link></li>
                <li><Link to="/categories" className="animated-link">Categories</Link></li>
                <li><Link to="/about" className="animated-link">About Us</Link></li>
                <li><Link to="/contact" className="animated-link">Contact</Link></li>
              </ul>
            </div>

            {/* Operations & Policy Matrix */}
            <div className="luxury-footer-section">
              <h4 className="section-title">Assistance</h4>
              <ul className="footer-links-list">
                <li><Link to="/faq" className="animated-link">FAQ</Link></li>
                <li><Link to="/privacy-policy" className="animated-link">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="animated-link">Terms & Conditions</Link></li>
                <li><a href="mailto:support@rqfashion.com" className="animated-link">Email Support</a></li>
              </ul>
            </div>
          </div>

          {/* Real-time Dynamic Newsletter CRM Form */}
          <div className="luxury-footer-section newsletter-block">
            <h4 className="section-title">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="premium-newsletter-form" noValidate>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  aria-label="Email address for premium newsletter updates"
                  className="premium-input"
                  required
                />
                <button type="submit" className="premium-submit-btn" aria-label="Subscribe to mailing list">
                  SUBSCRIBE
                </button>
              </div>
              {status.message && (
                <div className={`form-status-msg ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
          
        </div>

        {/* Legal & Compliance Footer Ribbon */}
        <div className="luxury-footer-bottom">
          <p className="copyright-text">&copy; {new Date().getFullYear()} RQ FASHION. All rights reserved.</p>
          <p className="credit-text">Premium Stitched Women's Couture</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;