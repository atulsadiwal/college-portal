'use client';

import React from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: 'Tech Fest 2024',
    date: 'Jan 15, 2024',
    description: 'Explore innovative technologies and connect with peers.',
  },
  {
    title: 'Cultural Night',
    date: 'Feb 20, 2024',
    description: 'Celebrate the diverse culture of our college community.',
  },
  {
    title: 'Sports Week',
    date: 'Mar 10-15, 2024',
    description: 'Unleash your athletic spirit and join the exciting sports events.',
  },
  {
    title: 'Alumni Meet',
    date: 'Apr 25, 2024',
    description: 'Reconnect with alumni and strengthen professional networks.',
  },
  {
    title: 'Entrepreneurship Summit',
    date: 'May 5, 2024',
    description: 'Learn from industry leaders and pitch your innovative ideas.',
  },
  {
    title: 'Art & Design Exhibition',
    date: 'June 12, 2024',
    description: 'Witness the creative works of our talented students.',
  },
];

const EventsSection = () => {
  const infiniteScrollVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Events
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stay updated with the latest events and happenings at our college.
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            variants={infiniteScrollVariants}
            animate="animate"
          >
            {[...events, ...events].map((event, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
                <p className="text-blue-700 font-semibold mb-1">Date: {event.date}</p>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
