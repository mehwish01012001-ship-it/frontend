import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const routeLabels = {
  '/': 'Home',
  '/shop': 'Shop',
  '/cart': 'Cart',
  '/wishlist': 'Wishlist',
  '/compare-products': 'Compare Products',
  '/about': 'About',
  '/contact': 'Contact',
  '/faq': 'FAQ',
  '/privacy-policy': 'Privacy Policy',
  '/terms-conditions': 'Terms & Conditions',
  '/login': 'Login',
  '/register': 'Register',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/profile': 'Profile',
  '/orders': 'Orders',
  '/addresses': 'Addresses',
  '/checkout': 'Checkout',
  '/track-order': 'Track Order',
};

const formatLabel = (segment) => {
  if (!segment) return 'Home';
  const decoded = decodeURIComponent(segment).replace(/-/g, ' ');
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 0) return null;

  const currentPath = `/${pathnames.join('/')}`;
  const currentLabel = routeLabels[currentPath] || formatLabel(pathnames[pathnames.length - 1]);

  const isProductDetail = pathnames[0] === 'product' || pathnames[0] === 'productdetails';

  const crumbs = isProductDetail
    ? [
        { path: '/', label: 'Home', isLast: false },
        { path: currentPath, label: 'Product', isLast: true },
      ]
    : [
        { path: '/', label: 'Home', isLast: false },
        { path: currentPath, label: currentLabel, isLast: true },
      ];

  return (
    <nav className="custom-breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={`${crumb.path}-${index}`}>
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {crumb.isLast ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path}>{crumb.label}</Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
