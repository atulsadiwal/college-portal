'use client';

import React from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/Searchbar';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import EventsSection from '@/components/EventsSection';
import Testimonial from '@/components/Testimonial';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import LogoSlider from '@/components/LogoSlider';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <AboutSection />
      <ProgramsSection />
      <Banner />
      <EventsSection />
      <Testimonial />
      <LogoSlider />
      <Achievements />
      <Footer />
    </div>
  );
};

export default HomePage;
