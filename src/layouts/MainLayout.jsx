import React from 'react';

import OverlayNavbar from '../components/Navbar/OverlayNavbar';
import Footer from '../components/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <OverlayNavbar />
    <main className="layout-content">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;
