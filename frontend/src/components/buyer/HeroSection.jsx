import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import carousel1 from "../../assets/images/carousel-1.jpg";
import carousel2 from "../../assets/images/carousel-2.jpg";

const HeroSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full lg:w-[55%] h-full flex items-center px-8 lg:px-16 pt-32 pb-12"
        >
          <div className="max-w-3xl">
            {/* Premium Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-[#F3703A] rounded-full animate-pulse" />
              <span className="text-[#F3703A] text-sm font-medium tracking-wider uppercase">
                Premium Properties
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Find Your <br />
              <span className="text-[#F3703A]">Dream Home</span> in <br />
              Prime Locations
            </motion.h1>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative bg-white p-2 rounded-2xl mb-12 shadow-lg"
            >
              <div className="flex flex-col lg:flex-row gap-2">
                {/* Location Input */}
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MapPin size={20} className="text-[#F3703A]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F3703A] transition-all"
                  />
                </div>

                {/* Search Button */}
                <button className="h-14 px-8 bg-[#F3703A] hover:bg-[#E65A2A] text-white rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:translate-x-1 shadow-md hover:shadow-lg">
                  <Search size={20} />
                  <span className="font-medium">Search</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { number: "500+", label: "Luxury Properties" },
                { number: "98%", label: "Happy Clients" },
                { number: "15+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <div className="relative w-full lg:w-[45%] h-full">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 lg:hidden block" />

          {/* Image Slider */}
          <Slider ref={sliderRef} {...sliderSettings} className="h-full">
            {[carousel1, carousel2].map((img, idx) => (
              <div key={idx} className="h-full">
                <div className="relative h-full">
                  <img
                    src={img}
                    alt={`Luxury Property ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
            ))}
          </Slider>

          {/* VERSION 1: Navigation Controls on Image Edges */}
          <div className="absolute inset-0 z-20">
            <div className="relative h-full">
              {/* Left Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* VERSION 2: Navigation Controls Centered (Commented) */}
          {/* <div className="absolute inset-0 z-20">
            <div className="relative h-full flex justify-center items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-gray-900 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(2).padStart(2, '0')}
                </div>
                <button
                  onClick={handleNext}
                  className="p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* VERSION 3: Navigation Controls in Gradient Overlay - Desktop Only */}
        {/* <div className="absolute top-1/2 left-[52.5%] -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-gray-900 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              {String(currentSlide + 1).padStart(2, '0')} / {String(2).padStart(2, '0')}
            </div>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-white hover:bg-[#F3703A] hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div> */}

        {/* Featured Categories */}
        <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-white/80 via-white/50 to-transparent">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="flex gap-8">
                {[
                  "Premium Homes",
                  "Luxury Apartments",
                  "Penthouses",
                  "Beach Villas",
                ].map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ y: -2 }}
                    className="text-gray-600 hover:text-[#F3703A] transition-all duration-300"
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
