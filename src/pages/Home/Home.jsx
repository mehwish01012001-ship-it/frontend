import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Seo from "../../components/Seo/Seo";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import BestSellers from "../../components/BestSellers/BestSellers";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import FlashSale from "../../components/FlashSale/FlashSale";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import Testimonials from "../../components/Testimonials/Testimonials";
import BrandStory from "../../components/BrandStory/BrandStory";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { productService } from "../../services";
import { setProducts } from "../../redux/slices/productSlice";
import { setCategories } from "../../redux/slices/categorySlice";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllProducts({
          limit: 20,
        }),
        productService.getNewArrivals(8),
      ]);

      const fetchedProducts = productsRes?.data?.products || [];
      const fetchedCategories = categoriesRes?.data?.categories || [];

      dispatch(setProducts(fetchedProducts));
      dispatch(setCategories(fetchedCategories));

      setHomeData({
        newArrivals: fetchedProducts.slice(0, 8),
        bestSellers: fetchedProducts.slice(8, 16),
        trending: fetchedProducts.slice(4, 12),
        flashSale: fetchedProducts.slice(0, 6),
      });
    } catch (err) {
      console.error("Error fetching home data:", err);
    }
  };

  if (loading && !homeData) {
    return <LoadingSpinner fullscreen size="lg" />;
  }

  // Schema markup for Premium Women's Stitched Clothing Brand
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "RQ Fashion",
    "description": "Exclusive Premium Women's Stitched Clothing and Luxury Pret Designs.",
    "url": window.location.origin,
    "telephone": "",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    }
  };

  return (
    <>
      <Seo
        title="RQ Fashion | Premium Women's Stitched Clothing & Luxury Pret"
        description="Discover RQ Fashion's exquisite collection of premium women's stitched clothing, luxury pret, elegant coordinates, and designer ready-to-wear ensembles."
        keywords="women stitched clothing, luxury pret, ready to wear, designer stitched dresses, premium pret line, Pakistani designer wear, elegant coordinates, silk suits, stitched luxury lawn"
        canonicalUrl={window.location.href}
        ogType="website"
        ogTitle="RQ Fashion | Premium Women's Stitched Clothing & Luxury Pret"
        ogDescription="Elevate your wardrobe with our masterfully crafted, stitched luxury ensembles designed for modern elegance."
        twitterCard="summary_large_image"
        schemaMarkup={structuredData}
      />

      <main className="lux-home">
        {/* Decorative Ambient Background Accents */}
        <div className="home-glow glow-one"></div>
        <div className="home-glow glow-two"></div>

        <HeroSlider />

        {homeData?.flashSale?.length > 0 && (
          <section className="lux-section">
            <FlashSale products={homeData.flashSale} />
          </section>
        )}

      

        {categories?.length > 0 && (
          <section className="lux-section">
            <CategoryShowcase categories={categories.slice(0, 6)} />
          </section>
        )}

        {homeData?.bestSellers?.length > 0 && (
          <section className="lux-section">
            <BestSellers products={homeData.bestSellers} />
          </section>
        )}

        {homeData?.trending?.length > 0 && (
          <section className="lux-section">
            <TrendingProducts products={homeData.trending} />
          </section>
        )}

        <BrandStory />

        {homeData?.newArrivals?.length > 0 && (
          <section className="lux-section">
            <NewArrivals products={homeData.newArrivals} />
          </section>
        )}

        <Testimonials />

      
      </main>
    </>
  );
};

export default Home;







// import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // Core Components (Loaded Immediately for Above-the-Fold Priority)
// import Seo from "../../components/Seo/Seo";
// import HeroSlider from "../../components/HeroSlider/HeroSlider";
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// // Services & Actions
// import { productService } from "../../services";
// import { setProducts } from "../../redux/slices/productSlice";
// import { setCategories } from "../../redux/slices/categorySlice";

// import "./Home.css";

// // Lazy Loaded Components (Below-the-Fold Performance Optimization)
// const FlashSale = lazy(() => import("../../components/FlashSale/FlashSale"));
// const CategoryShowcase = lazy(() => import("../../components/CategoryShowcase/CategoryShowcase"));
// const BestSellers = lazy(() => import("../../components/BestSellers/BestSellers"));
// const TrendingProducts = lazy(() => import("../../components/TrendingProducts/TrendingProducts"));
// const BrandStory = lazy(() => import("../../components/BrandStory/BrandStory"));
// const NewArrivals = lazy(() => import("../../components/NewArrivals/NewArrivals"));
// const Testimonials = lazy(() => import("../../components/Testimonials/Testimonials"));

// // Fallback loader placeholder using native CSS classes
// const SectionLoader = () => (
//   <div className="section-loading-placeholder">
//     <LoadingSpinner size="md" />
//   </div>
// );

// const Home = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.product);
//   const { categories } = useSelector((state) => state.category);

//   const [homeData, setHomeData] = useState({
//     newArrivals: [],
//     bestSellers: [],
//     trending: [],
//     flashSale: [],
//   });
//   const [fetchError, setFetchError] = useState(false);

//   // Safe window environment detection for static-site parsing compatibility
//   const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://rqfashion.com";
//   const canonicalUrl = typeof window !== "undefined" && window.location.pathname 
//     ? `${siteUrl}${window.location.pathname}` 
//     : "https://rqfashion.com/";

//   useEffect(() => {
//     try {
//       window.scrollTo({ top: 0, behavior: "auto" });
//     } catch {
//       window.scrollTo(0, 0);
//     }
//     fetchHomeData();
//   }, []);

//   const fetchHomeData = async () => {
//     try {
//       setFetchError(false);

//       // RESOLVED CRITICAL BUG 1: Parallelized categories fetching alongside products
//       const [productsRes, arrivalsRes, categoriesRes] = await Promise.allSettled([
//         productService.getAllProducts({ limit: 20 }),
//         productService.getNewArrivals(8),
//         productService.getCategories ? productService.getCategories() : Promise.resolve({ data: [] })
//       ]);

//       let fetchedProducts = [];
//       let fetchedNewArrivals = [];
//       let fetchedCategories = [];

//       if (productsRes.status === "fulfilled") {
//         fetchedProducts = productsRes.value?.data?.products || [];
//         dispatch(setProducts(fetchedProducts));
//       } else {
//         console.warn("Products call failed:", productsRes.reason);
//       }

//       if (arrivalsRes.status === "fulfilled") {
//         fetchedNewArrivals = arrivalsRes.value?.data?.products || arrivalsRes.value?.data || [];
//       } else {
//         console.warn("New arrivals call failed:", arrivalsRes.reason);
//       }

//       if (categoriesRes.status === "fulfilled") {
//         fetchedCategories = categoriesRes.value?.data?.categories || categoriesRes.value?.data || [];
//         dispatch(setCategories(fetchedCategories));
//       } else {
//         console.warn("Categories loading call failed:", categoriesRes.reason);
//       }

//       // Safe slice distribution
//       const finalNewArrivals = fetchedNewArrivals.length > 0 
//         ? fetchedNewArrivals 
//         : fetchedProducts.slice(12, 20);

//       setHomeData({
//         flashSale: fetchedProducts.slice(0, 6),
//         bestSellers: fetchedProducts.slice(6, 12),
//         trending: fetchedProducts.slice(12, 18),
//         newArrivals: finalNewArrivals,
//       });

//       if (productsRes.status === "rejected" && arrivalsRes.status === "rejected") {
//         setFetchError(true);
//       }
//     } catch (err) {
//       console.error("Critical error in homepage initialization:", err);
//       setFetchError(true);
//     }
//   };

//   // High-Fidelity Schema Graph markup optimized for Google Rich Snippets
//   const structuredData = useMemo(() => ({
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": `${siteUrl}/#organization`,
//         "name": "RQ Fashion",
//         "url": siteUrl,
//         "logo": {
//           "@type": "ImageObject",
//           "@id": `${siteUrl}/#logo`,
//           "url": `${siteUrl}/logo.png`, // Absolute path verification fallback
//           "caption": "RQ Fashion Logo"
//         },
//         "image": {
//           "@id": `${siteUrl}/#logo`
//         },
//         "sameAs": [
//           "https://www.facebook.com/rqfashionpk",
//           "https://www.instagram.com/rqfashion"
//         ],
//         "contactPoint": {
//           "@type": "ContactPoint",
//           "telephone": "+92-300-1234567", // Update with your actual registered phone line
//           "contactType": "customer service",
//           "areaServed": "PK",
//           "availableLanguage": "English"
//         }
//       },
//       {
//         "@type": "ClothingStore",
//         "@id": `${siteUrl}/#store`,
//         "name": "RQ Fashion",
//         "hasMap": "https://maps.google.com/?cid=yourstorecid", // Optional direct Map citation
//         "telephone": "+92-300-1234567",
//         "priceRange": "$$$",
//         "address": {
//           "@type": "PostalAddress",
//           "streetAddress": "Plot 12C, Gulberg III",
//           "addressLocality": "Lahore",
//           "addressRegion": "Punjab",
//           "postalCode": "54660",
//           "addressCountry": "PK"
//         }
//       },
//       {
//         "@type": "WebSite",
//         "@id": `${siteUrl}/#website`,
//         "url": siteUrl,
//         "name": "RQ Fashion",
//         "publisher": { "@id": `${siteUrl}/#organization` },
//         "potentialAction": {
//           "@type": "SearchAction",
//           "target": `${siteUrl}/search?q={search_term_string}`,
//           "query-input": "required name=search_term_string"
//         }
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${canonicalUrl}#webpage`,
//         "url": canonicalUrl,
//         "name": "RQ Fashion | Premium Women's Stitched Clothing & Luxury Pret",
//         "description": "Discover RQ Fashion's exquisite collection of premium women's stitched clothing, luxury pret, elegant coordinates, and designer ready-to-wear ensembles.",
//         "isPartOf": { "@id": `${siteUrl}/#website` },
//         "about": { "@id": `${siteUrl}/#organization` }
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": `${canonicalUrl}#breadcrumb`,
//         "itemListElement": [
//           {
//             "@type": "ListItem",
//             "position": 1,
//             "name": "Home",
//             "item": siteUrl
//           }
//         ]
//       }
//     ]
//   }), [siteUrl, canonicalUrl]);

//   if (loading && !homeData.bestSellers.length) {
//     return <LoadingSpinner fullscreen size="lg" />;
//   }

//   if (fetchError && !homeData.bestSellers.length) {
//     return (
//       <div className="home-error-fallback">
//         <h2>Unable to load collection</h2>
//         <p>Please check your connection and try again.</p>
//         <button className="error-retry-btn" onClick={fetchHomeData}>
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Seo
//         title="RQ Fashion | Premium Women's Stitched & Luxury Pret Wear"
//         description="Shop exclusive premium women's stitched suits, elegant pret lines, designer ready-to-wear coordinates, and high-end traditional luxury designs at RQ Fashion."
//         keywords="women stitched clothing, luxury pret, ready to wear, designer stitched dresses, premium pret line, Pakistani designer wear, elegant coordinates, silk suits, stitched luxury lawn, luxury pret wear"
//         canonicalUrl={canonicalUrl}
//         ogType="website"
//         ogTitle="RQ Fashion | Premium Women's Stitched Clothing & Luxury Pret"
//         ogDescription="Elevate your wardrobe with masterfully crafted stitched luxury ensembles designed for modern elegance."
//         twitterCard="summary_large_image"
//         schemaMarkup={structuredData}
//       />

//       {/* Accessible bypass Skip Link */}
//       <a href="#main-content" className="skip-link">
//         Skip to main content
//       </a>

//       <main className="lux-home" id="main-content">
//         <div className="home-glow glow-one" aria-hidden="true"></div>
//         <div className="home-glow glow-two" aria-hidden="true"></div>

//         <HeroSlider />

//         <Suspense fallback={<SectionLoader />}>
//           {homeData.flashSale.length > 0 && (
//             <section className="lux-section" aria-labelledby="flashsale-heading">
//               <h2 id="flashsale-heading" className="sr-only">
//                 Exclusive Flash Sales
//               </h2>
//               <FlashSale products={homeData.flashSale} />
//             </section>
//           )}

//           {categories?.length > 0 && (
//             <section className="lux-section" aria-labelledby="categories-heading">
//               <h2 id="categories-heading" className="sr-only">
//                 Shop by Categories
//               </h2>
//               <CategoryShowcase categories={categories.slice(0, 6)} />
//             </section>
//           )}

//           {homeData.bestSellers.length > 0 && (
//             <section className="lux-section" aria-labelledby="bestsellers-heading">
//               <h2 id="bestsellers-heading" className="sr-only">
//                 Bestselling Collections
//               </h2>
//               <BestSellers products={homeData.bestSellers} />
//             </section>
//           )}

//           {homeData.trending.length > 0 && (
//             <section className="lux-section" aria-labelledby="trending-heading">
//               <h2 id="trending-heading" className="sr-only">
//                 Trending Modern Styles
//               </h2>
//               <TrendingProducts products={homeData.trending} />
//             </section>
//           )}

//           <section className="lux-section" aria-labelledby="brandstory-heading">
//             <h2 id="brandstory-heading" className="sr-only">
//               Our Story & Craftsmanship
//             </h2>
//             <BrandStory />
//           </section>

//           {homeData.newArrivals.length > 0 && (
//             <section className="lux-section" aria-labelledby="newarrivals-heading">
//               <h2 id="newarrivals-heading" className="sr-only">
//                 New Autumn Arrivals
//               </h2>
//               <NewArrivals products={homeData.newArrivals} />
//             </section>
//           )}

//           <section className="lux-section" aria-labelledby="testimonials-heading">
//             <h2 id="testimonials-heading" className="sr-only">
//               What Our Clients Say
//             </h2>
//             <Testimonials />
//           </section>
//         </Suspense>
//       </main>
//     </>
//   );
// };

// export default Home;