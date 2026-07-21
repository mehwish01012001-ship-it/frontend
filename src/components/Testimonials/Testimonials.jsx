import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";

import { FiStar, FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./Testimonials.css";

const Testimonials = ({ testimonials = [], theme = "gold" }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Exceptional quality and elegant designs. Every order feels like a luxury experience.",
      rating: 5,
      verified: true,
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Emma Davis",
      role: "Loyal Customer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Absolutely love the premium fabric quality and attention to detail. Will definitely shop again!",
      rating: 5,
      verified: true,
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Michael Smith",
      role: "Fashion Buyer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "One of the most professional online fashion stores I've ever used. Quick delivery and top-notch fit.",
      rating: 4.5,
      verified: true,
      date: "2 weeks ago",
    },
    {
      id: 4,
      name: "Sophia Lee",
      role: "Designer",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      text: "Luxury collections that truly stand out. Highly recommended for those who appreciate fine craftsmanship.",
      rating: 5,
      verified: false,
      date: "1 month ago",
    },
  ];

  const data = testimonials.length > 0 ? testimonials : defaultTestimonials;

  // Helper to render rating stars (supports halves)
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<FiStar key={i} className="star-icon filled" />);
      } else if (i === floorRating + 1 && hasHalf) {
        stars.push(
          <div key={i} className="star-half-wrapper">
            <FiStar className="star-icon empty" />
            <div className="star-half-inner" style={{ width: "50%" }}>
              <FiStar className="star-icon filled" />
            </div>
          </div>
        );
      } else {
        stars.push(<FiStar key={i} className="star-icon empty" />);
      }
    }
    return stars;
  };

  // Framer Motion Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={`lux-testimonials ${theme}`} ref={containerRef}>
      {/* Dynamic Background Elements */}
      <div className="lux-bg-glow glow-1" />
      <div className="lux-bg-glow glow-2" />

      <div className="container">
        {/* Animated Header */}
        <motion.div
          className="testimonial-heading"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="subtitle">CUSTOMER REVIEWS</span>
          <h2 className="title">
            Trusted By Thousands <br />
            Of Fashion Lovers
          </h2>
          <div className="accent-line" />
          <p className="description">
Experience premium craftsmanship, refined silhouettes, and exceptional quality designed to elevate every wardrobe with timeless elegance..
          </p>
        </motion.div>

        {/* Carousel Wrapper with custom navigators */}
        <div className="swiper-outer-wrapper">
          <button ref={prevRef} className="swiper-nav-btn prev-btn" aria-label="Previous slide">
            <FiChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-nav-btn next-btn" aria-label="Next slide">
            <FiChevronRight />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // Re-bind Swiper's internal navigation targets
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            spaceBetween={30}
            grabCursor={true}
            centeredSlides={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="testimonials-swiper"
          >
            {data.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <motion.div
                  className="lux-review-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="card-top-accent" />
                  
                  <div className="card-header">
                    <span className="quote-icon">“</span>
                    {item.verified && (
                      <span className="verified-badge">
                        <FiCheck className="check-icon" /> Verified Buyer
                      </span>
                    )}
                  </div>

                  <div className="review-stars">
                    {renderStars(item.rating)}
                  </div>

                  <p className="review-text">
                    {item.text}
                  </p>

                  <div className="card-footer-divider" />

                  <div className="review-user">
                    <div className="avatar-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="user-info">
                      <h4>{item.name}</h4>
                      <div className="user-meta">
                        <span className="role">{item.role}</span>
                        {item.date && (
                          <>
                            <span className="meta-dot">•</span>
                            <span className="date">{item.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;