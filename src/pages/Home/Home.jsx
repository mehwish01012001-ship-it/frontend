import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Seo from "../../components/SEO";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import BestSellers from "../../components/BestSellers/BestSellers";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import FlashSale from "../../components/FlashSale/FlashSale";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import Testimonials from "../../components/Testimonials/Testimonials";
import BrandStory from "../../components/BrandStory/BrandStory";



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