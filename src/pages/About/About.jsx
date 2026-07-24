import React from 'react';
import Seo from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './About.css';

const About = () => {
  return (
    <>
      <Seo
        title="About RQ Fashion | Luxury Womens Clothing"
        description="Learn about RQ Fashion's premium stitched clothing, elegant styling, and luxury craftsmanship for women."
        keywords="about rq fashion, luxury womens clothing, stitched pret brand, premium fashion brand"
        canonicalUrl={window.location.href}
        ogTitle="About RQ Fashion | Luxury Womens Clothing"
        ogDescription="Learn about RQ Fashion's premium stitched clothing, elegant styling, and luxury craftsmanship for women."
        twitterCard="summary_large_image"
      />

      <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <Breadcrumbs />
          <h1>About RQ Fashion</h1>
          <p>Luxury Fashion, Timeless Elegance</p>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="container">
            <h2>Our Story</h2>
            <p>
              RQ Fashion was founded with a vision to bring premium, luxury fashion to everyone.
              We believe that elegance should be accessible, and quality should never be compromised.
              Our carefully curated collections represent the finest in fashion design and craftsmanship.
            </p>
          </div>
        </section>

        <section className="about-section alt">
          <div className="container">
            <h2>Our Mission</h2>
            <p>
              To provide exceptional fashion experiences by offering high-quality, trendy, and
              sustainable clothing that empowers individuals to express their unique style with
              confidence and sophistication.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <h2>Why Choose Us</h2>
            <ul className="features-list">
              <li>Premium Quality Products</li>
              <li>Exclusive Collections</li>
              <li>Competitive Pricing</li>
              <li>Fast & Reliable Shipping</li>
              <li>24/7 Customer Support</li>
              <li>Easy Returns & Exchanges</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
      </>
  );
};

export default About;
