import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./HeroSlider.css";
import api, { getAbsoluteUrl } from "../../services/api";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hero-slider/public');
      const fetchedSlides = Array.isArray(response?.data?.slides)
        ? response.data.slides.filter((slide) => slide?.isActive !== false)
        : [];
      setSlides(fetchedSlides);

      if (swiperRef.current) {
        swiperRef.current.update();
        swiperRef.current.slideTo(0, 0);
      }
    } catch (error) {
      console.error('Failed to load hero slider slides', error);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchSlides();
      }
    };

    window.addEventListener('focus', handleVisibilityChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.update();
    swiperRef.current.slideTo(0, 0);

    if (slides.length > 1) {
      swiperRef.current.autoplay?.start();
    } else {
      swiperRef.current.autoplay?.stop();
    }
  }, [slides.length]);

  if (!loading && slides.length === 0) {
    return null;
  }

  return (

    <section className="luxury-hero">


      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        effect="fade"
        speed={1200}
        loop={slides.length > 1}
        observer={true}
        observeParents={true}
        observeSlideChildren={true}
        autoplay={slides.length > 1 ? {
          delay:5000,
          disableOnInteraction:false,
        } : false}
        pagination={{
          clickable:true,
        }}
        className="luxury-swiper"
      >



        {
          slides.map((slide, index)=>{
            const isVideoSlide = slide?.mediaType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(slide?.image || '');
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={slide._id || slide.id}>


                <div
                  className={`luxury-slide ${isVideoSlide ? 'video-slide' : ''} ${isActive ? 'is-active' : ''}`}
                >
                  {isVideoSlide ? (
                    <video
                      className="luxury-media luxury-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster={getAbsoluteUrl(slide.image)}
                    >
                      <source src={getAbsoluteUrl(slide.image)} />
                    </video>
                  ) : (
                    <div
                      className="luxury-media luxury-image"
                      style={{
                        backgroundImage: `url(${getAbsoluteUrl(slide.image)})`
                      }}
                    />
                  )}


                  {/* Dark Layer */}

                <div className="luxury-overlay"></div>



                {/* Animated Lights */}

                <div className="light-orb orb-one"></div>

                <div className="light-orb orb-two"></div>

                <div className="light-orb orb-three"></div>




                <div className="luxury-container">



                  <div className={`hero-card ${isActive ? 'is-active' : ''}`}>

                    <h1>

                      {slide.title || ''}

                      <br/>

                      <span>

                       
                        {slide.highlight || ''}

                      </span>

                    </h1>




                    <p>

                      {slide.description || ''}

                    </p>




                    <div className="hero-buttons">
                      <Link
                        to="/shop"
                        className="lux-btn primary"
                      >
                        {slide.buttonText || 'Explore Collection'}
                      </Link>
                    </div>





                    <div className="premium-info">



                      <div className="info-box">

                        <strong>

                          10K+

                        </strong>

                        <small>

                          Happy Clients

                        </small>

                      </div>



                      <div className="info-box">

                        <strong>

                          500+

                        </strong>

                        <small>

                          Products

                        </small>

                      </div>




                      <div className="info-box">

                        <strong>

                          4.9★

                        </strong>

                        <small>

                          Rating

                        </small>

                      </div>



                    </div>




                  </div>





                  {/* Floating Product Card */}


                  <div className="floating-product">


                    <div className="mini-image">

                      <img
                        src={getAbsoluteUrl(slide.image)}
                        alt={slide.title}
                      />

                    </div>



                    <div>

                      <span>
                        Premium
                      </span>


                      <h3>
                        {slide.category || 'Luxury Collection'}
                      </h3>


                      <p>
                        New Season
                      </p>


                    </div>



                  </div>





                  {/* Side Badge */}


                  <div className="side-badge">

                    <span>
                      2026
                    </span>

                    COLLECTION

                  </div>



                </div>




              </div>


              </SwiperSlide>
            );
          })
        }



      </Swiper>



    </section>

  );

};


export default HeroSlider;