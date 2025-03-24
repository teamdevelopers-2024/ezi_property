import React from 'react';
import Header from '../../components/common/Header/Header';
import HeroSection from '../../components/buyer/HeroSection';
import SearchBar from '../../components/buyer/SearchBar';
import PropertyTypes from '../../components/buyer/PropertyTypes';
import WhyChooseUsSection from '../../components/buyer/WhyChooseUsSection';
import PropertyListing from '../../components/buyer/PropertyListing';
import Footer from '../../components/common/Footer/Footer';
import BackToTop from '../../components/common/BackToTop';

const Home = () => {
  return (
    <div className="container-xxl p-0"> 
      <Header/>
      <HeroSection/>
      <SearchBar/>
      <PropertyTypes/>
      <WhyChooseUsSection/>
      <PropertyListing/>
      <Footer/>
      <BackToTop />
    </div>
  );
};

export default Home;
