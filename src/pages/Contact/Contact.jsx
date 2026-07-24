import React, { useState } from "react";
import Seo from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { contactService } from '../../services';
import { toast } from 'react-toastify';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";

import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contactService.submitMessage(formData);
      toast.success("Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to send your message.";
      toast.error(message);
    }
  };

  const contactCards = [
    {
      icon: <FiMail />,
      title: "Email Us",
      text: "rqfashionofficialstore@gmail.com",
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      text: "+92 323 4376492",
    },
    {
      icon: <FiMapPin />,
      title: "Visit Us",
      text: "Shahdara, Lahore",
    },
    {
      icon: <FiClock />,
      title: "Working Hours",
      text: "Mon - Sat | 9AM - 8PM",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
    },
    {
      number: "120+",
      label: "Luxury Brands",
    },
    {
      number: "24/7",
      label: "Support",
    },
    {
      number: "99%",
      label: "Satisfaction",
    },
  ];

  return (
    <>
      <Seo
        title="Contact RQ Fashion | Premium Womens Clothing Support"
        description="Contact RQ Fashion for customer support, order inquiries, premium fashion advice, and luxury women's clothing service."
        keywords="contact rq fashion, premium womens fashion support, luxury clothing help, fashion customer service"
        canonicalUrl={window.location.href}
        ogTitle="Contact RQ Fashion | Premium Womens Clothing Support"
        ogDescription="Contact RQ Fashion for customer support, order inquiries, premium fashion advice, and luxury women's clothing service."
        twitterCard="summary_large_image"
      />
      <section className="lux-contact">

      <div className="container">
        <Breadcrumbs />
      </div>

      {/* Background Effects */}
      <div className="contact-orb orb-1"></div>
      <div className="contact-orb orb-2"></div>
      <div className="contact-orb orb-3"></div>

      {/* Hero */}
      <div className="contact-hero">

       

        <h1>
         Contact Us
        </h1>

        <p>
          Have questions about our collections, orders, or luxury
          services? Our team is always ready to help you.
        </p>

      </div>

      {/* Contact Cards */}

      <div className="contact-cards">

        {contactCards.map((card, index) => (
          <div className="contact-card" key={index}>

            <div className="card-icon">
              {card.icon}
            </div>

            <h3>{card.title}</h3>

            <p>{card.text}</p>

          </div>
        ))}

      </div>

      {/* Main Content */}

      <div className="contact-wrapper">

        {/* Left Side */}

        <div className="contact-left">

          <div className="contact-info-box">

            <span className="mini-title">
              GET IN TOUCH
            </span>

            <h2>
              We Love Hearing From Our Customers
            </h2>

       

            <div className="contact-list">

              <div className="contact-list-item">
                <FiMail />
                <span>rqfashionofficialstore@gmail.com</span>
              </div>

              <div className="contact-list-item">
                <FiPhone />
                <span>+92 323 4376492</span>
              </div>

              <div className="contact-list-item">
                <FiMapPin />
                <span>Shahdara, Lahore</span>
              </div>

            </div>

            {/* Social */}

            <div className="social-section">

              <h4>Follow Us</h4>

              <div className="social-icons">

                <a href="/">
                  <FiInstagram />
                </a>

                <a href="/">
                  <FiFacebook />
                </a>

                <a href="/">
                  <FiTwitter />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="contact-form-box">

          <div className="form-header">
            <h2>Send Message</h2>
            <p>
              Fill out the form below and we will get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-row">

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                rows="7"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              <FiSend />
              Send Message
            </button>

          </form>

        </div>

      </div>

      

      {/* Map Section */}

      <section className="map-section">

        <div className="map-content">

          <h2>Visit Our Fashion Studio</h2>

          <p>
            Experience luxury fashion in person and discover
            our latest collections.
          </p>

        </div>

        <div className="map-placeholder">
          <FiMapPin />
          <span>Store Location</span>
        </div>

      </section>

      {/* CTA */}

     

    </section>
      </>
  );
};

export default Contact;