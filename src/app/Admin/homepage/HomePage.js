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

const HomePage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <AboutSection />
      <ProgramsSection />
      <EventsSection />
      <Testimonial />
      <Achievements />
      <Footer />
    </div>
  );
};

export default HomePage;
