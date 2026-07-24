import React from 'react';

import OverlayNavbar from '../components/Navbar/OverlayNavbar';
import Footer from '../components/Footer/Footer';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import './MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <OverlayNavbar />
    <main className="layout-content">{children}</main>
    <CartDrawer />
    <Footer />
  </div>
);

export default MainLayout;
