// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiArrowRight,
//   FiAward,
//   FiUsers,
//   FiStar,
//   FiAlertCircle
// } from "react-icons/fi";
// import { API_BASE_URL } from "../../utils/constants";
// import "./BrandStory.css";

// const fallbackStoryData = {
//   title: "Luxury Fashion, Crafted with Purpose",
 
//   paragraph:
//     "RQ Fashion presents timeless silhouettes, premium fabrics, and refined craftsmanship for women who embrace confidence, elegance, and effortless style every day.",
//   stats: [
//     { iconKey: "users", value: "10K+", label: "Happy Clients" },
//     { iconKey: "award", value: "4.9/5", label: "Average Rating" },
//     { iconKey: "star", value: "100%", label: "Premium Quality" },
//   ],
//   banners: [
//     "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
//     "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
//   ],
//   floatingCard: {
//     title: "Limited Edition",
//     subtitle: "Exclusive seasonal drops",
//   },
//   buttons: {
//     primary: { label: "Explore Collections", url: "/shop" },
//     secondary: { label: "View Lookbook", url: "/shop" },
//   },
// };

// const BrandStory = () => {
//   const [storyData, setStoryData] = useState(fallbackStoryData);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchBrandStory = async () => {
//       try {
//         setLoading(true);
//         const apiUri = API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "";
//         const response = await fetch(`${apiUri}/brand-story`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch brand story data.");
//         }

//         const data = await response.json();
//         if (data) {
//           setStoryData(data);
//         }
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         setStoryData(fallbackStoryData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBrandStory();
//   }, []);

//   // 2. Manage Carousel Interval safely based on dynamic banners
//   useEffect(() => {
//     if (!storyData?.banners || storyData.banners.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % storyData.banners.length);
//     }, 4500);

//     return () => clearInterval(interval);
//   }, [storyData]);

//   // 3. Inject Dynamic SEO Meta Tags for Search Crawlers
//   useEffect(() => {
//     if (!storyData) return;

//     const seo = storyData.seo || {};
//     const defaultTitle = "Premium Women's Stitched Clothing | RQ FASHION";
//     const defaultDesc = "Discover luxury women's stitched collections designed with modern elegance, contemporary style, and premium fabrics.";
    
//     // Update Document Title & Meta Tags
//     document.title = seo.metaTitle || defaultTitle;
    
//     const updateMetaTag = (selector, attribute, value) => {
//       let element = document.querySelector(selector);
//       if (!element) {
//         element = document.createElement("meta");
//         const match = selector.match(/\[([^=\]]+)=["']?([^\]"']+)["']?\]/);
//         if (match) {
//           element.setAttribute(match[1], match[2]);
//         }
//         document.head.appendChild(element);
//       }
//       element.setAttribute(attribute, value);
//     };

//     updateMetaTag('meta[name="description"]', "content", seo.metaDescription || defaultDesc);
//     updateMetaTag('meta[name="keywords"]', "content", seo.metaKeywords || "womens stitched luxury clothing, premium pret, designer stitched dresses");
    
//     // Open Graph / Facebook
//     updateMetaTag('meta[property="og:title"]', "content", seo.metaTitle || defaultTitle);
//     updateMetaTag('meta[property="og:description"]', "content", seo.metaDescription || defaultDesc);
//     updateMetaTag('meta[property="og:url"]', "content", window.location.href);
//     updateMetaTag('meta[property="og:type"]', "content", "website");
    
//     // Twitter Card
//     updateMetaTag('meta[name="twitter:title"]', "content", seo.metaTitle || defaultTitle);
//     updateMetaTag('meta[name="twitter:description"]', "content", seo.metaDescription || defaultDesc);

//     // Canonical Link
//     let canonical = document.querySelector('link[rel="canonical"]');
//     if (!canonical) {
//       canonical = document.createElement("link");
//       canonical.setAttribute("rel", "canonical");
//       document.head.appendChild(canonical);
//     }
//     canonical.setAttribute("href", window.location.href);

//   }, [storyData]);

//   // Loading Skeleton State
//   if (loading) {
//     return (
//       <section className="lux-story-skeleton" aria-live="polite">
//         <div className="container">
//           <div className="lux-story-wrapper">
//             <div className="skeleton-left">
//               <div className="line label-line"></div>
//               <div className="line title-line"></div>
//               <div className="line text-line"></div>
//               <div className="grid-skeleton">
//                 <div className="box"></div>
//                 <div className="box"></div>
//                 <div className="box"></div>
//               </div>
//             </div>
//             <div className="skeleton-right"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const { title, subtitle, paragraph, stats, banners, floatingCard, buttons } = storyData || fallbackStoryData;

//   return (
//     <section className="lux-story">
//       <div className="lux-bg-glow"></div>
//       <div className="container">
//         <div className="lux-story-wrapper">
          
//           {/* Left Content Side */}
//           <motion.div
//             className="lux-story-content"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             {subtitle && (
//               <span className="story-label">
//                 {subtitle}
//               </span>
//             )}

//             <h2>{title}</h2>

//             <p>{paragraph}</p>

//             {stats && stats.length > 0 && (
//               <div className="story-stats">
//                 {stats.map((stat, idx) => {
//                   const IconComponent = {
//                     users: FiUsers,
//                     award: FiAward,
//                     star: FiStar
//                   }[stat.iconKey] || FiStar;

//                   return (
//                     <div key={idx} className="stat-card">
//                       <IconComponent aria-hidden="true" />
//                       <h3>{stat.value}</h3>
//                       <span>{stat.label}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {buttons && (
//               <div className="story-buttons">
//                 {buttons.primary && (
//                   <a href={buttons.primary.url} className="story-btn">
//                     {buttons.primary.label}
//                     <FiArrowRight />
//                   </a>
//                 )}
//                 {buttons.secondary && (
//                   <a href={buttons.secondary.url} className="story-btn-outline">
//                     {buttons.secondary.label}
//                   </a>
//                 )}
//               </div>
//             )}
//           </motion.div>

//           {/* Right Imagery Side */}
//           <motion.div
//             className="story-slider"
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <div className="story-image-box">
//               <AnimatePresence mode="wait">
//                 {banners && banners.length > 0 && (
//                   <motion.img
//                     key={currentImageIndex}
//                     src={banners[currentImageIndex]}
//                     alt={`Luxury Collection Banner ${currentImageIndex + 1}`}
//                     className="story-image"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 1.2, ease: "easeInOut" }}
//                   />
//                 )}
//               </AnimatePresence>

//               <div className="story-overlay"></div>

//               {floatingCard && (
//                 <div className="story-floating-card">
//                   <h4>{floatingCard.title}</h4>
//                   <p>{floatingCard.subtitle}</p>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandStory;

















import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiAward, FiUsers, FiStar } from "react-icons/fi";
import { API_BASE_URL } from "../../utils/constants";
import "./BrandStory.css";

const BrandStory = () => {
  const [storyData, setStoryData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch dynamic brand story data from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchBrandStory = async () => {
      try {
        const apiUri = API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiUri}/brand-story`);
        
        if (response.ok) {
          const data = await response.json();
          if (isMounted && data) {
            setStoryData(data);
          }
        }
      } catch (err) {
        // Silent catch: page renders smoothly even if API fails or is offline
      }
    };

    fetchBrandStory();
    return () => {
      isMounted = false;
    };
  }, []);

  // Carousel slider auto-play transition
  useEffect(() => {
    if (!storyData?.banners || storyData.banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storyData.banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [storyData?.banners]);

  // Dynamic SEO Meta Tags & Schema.org Structured Data
  useEffect(() => {
    const seo = storyData?.seo || {};
    const defaultTitle = "Premium Women's Stitched Clothing | RQ FASHION";
    const defaultDesc = "Discover premium women's stitched collections designed with modern elegance, contemporary style, and fine quality fabrics.";

    document.title = seo.metaTitle || defaultTitle;

    const updateMeta = (selector, attr, val) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/\[([^=\]]+)=["']?([^\]"']+)["']?\]/);
        if (match) element.setAttribute(match[1], match[2]);
        document.head.appendChild(element);
      }
      element.setAttribute(attr, val);
    };

    updateMeta('meta[name="description"]', "content", seo.metaDescription || defaultDesc);
    updateMeta('meta[name="keywords"]', "content", seo.metaKeywords || "womens stitched clothing, pret wear, designer stitched dresses, women fashion");
    updateMeta('meta[property="og:title"]', "content", seo.metaTitle || defaultTitle);
    updateMeta('meta[property="og:description"]', "content", seo.metaDescription || defaultDesc);
    updateMeta('meta[property="og:type"]', "content", "website");
    updateMeta('meta[property="og:url"]', "content", window.location.href);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);

    // Structured Schema Data
    const schemaScriptId = "rq-brand-schema";
    let schemaScript = document.getElementById(schemaScriptId);
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = schemaScriptId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Brand",
      "name": "RQ FASHION",
      "description": seo.metaDescription || defaultDesc,
      "url": window.location.origin
    });
  }, [storyData]);

  // Destructure dynamic data with clean fallback definitions
  const title = storyData?.title || "Fashion Craftsmanship, Stitched to Perfection";
  const subtitle = storyData?.subtitle || "EXCLUSIVELY FOR WOMEN";
  const paragraph = storyData?.paragraph || "RQ Fashion presents timeless silhouettes, fine fabrics, and refined stitching details for women who embrace confidence and modern elegance every day.";
  const stats = storyData?.stats || [
    { iconKey: "users", value: "10K+", label: "Happy Clients" },
    { iconKey: "award", value: "4.9/5", label: "Average Rating" },
    { iconKey: "star", value: "100%", label: "Premium Quality" },
  ];
  const banners = storyData?.banners || [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
  ];
  const floatingCard = storyData?.floatingCard || {
    title: "Limited Edition",
    subtitle: "Exclusive Seasonal Stitched Collection"
  };
  const buttons = storyData?.buttons || {
    primary: { label: "Explore Collections", url: "/shop" },
    secondary: { label: "View Lookbook", url: "/shop" }
  };

  return (
    <section className="rq-brand-section">
      <div className="rq-brand-glow"></div>
      <div className="rq-brand-container">
        <div className="rq-brand-grid">
          
          {/* Content Block */}
          <motion.div
            className="rq-brand-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {subtitle && <span className="rq-brand-label">{subtitle}</span>}
            <h2 className="rq-brand-heading">{title}</h2>
            <p className="rq-brand-text">{paragraph}</p>

            {/* Stats Block */}
            {stats && stats.length > 0 && (
              <div className="rq-brand-stats-grid">
                {stats.map((stat, idx) => {
                  const Icon = {
                    users: FiUsers,
                    award: FiAward,
                    star: FiStar
                  }[stat.iconKey] || FiStar;

                  return (
                    <div key={idx} className="rq-brand-stat-card">
                      <Icon className="rq-brand-stat-icon" aria-hidden="true" />
                      <h3 className="rq-brand-stat-value">{stat.value}</h3>
                      <span className="rq-brand-stat-label">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action Buttons */}
            {buttons && (
              <div className="rq-brand-actions">
                {buttons.primary && (
                  <a href={buttons.primary.url} className="rq-brand-btn-primary">
                    {buttons.primary.label}
                    <FiArrowRight />
                  </a>
                )}
                {buttons.secondary && (
                  <a href={buttons.secondary.url} className="rq-brand-btn-secondary">
                    {buttons.secondary.label}
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Visual Showcase Block */}
          <motion.div
            className="rq-brand-media"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="rq-brand-image-frame">
              <AnimatePresence mode="wait">
                {banners && banners.length > 0 && (
                  <motion.img
                    key={currentImageIndex}
                    src={banners[currentImageIndex]}
                    alt={`Women Stitched Collection Banner ${currentImageIndex + 1}`}
                    className="rq-brand-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              <div className="rq-brand-overlay"></div>

              {floatingCard && (
                <div className="rq-brand-floating-card">
                  <h4>{floatingCard.title}</h4>
                  <p>{floatingCard.subtitle}</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;