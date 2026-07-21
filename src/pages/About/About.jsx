import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
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
  );
};

export default About;
