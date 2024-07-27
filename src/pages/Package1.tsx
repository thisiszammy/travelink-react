// src/components/tourPackages/PrivateTourPackage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import islandAnimation from '../res/animations/Island.json'; // Adjust the animation path
import TopBar from '../components/LandingNavBar';
import BookingFormModal from './bookingForm/BookingFormModal';
import TourDetailsModal from './TourDetailsModal'; // Import the TourDetailsModal component

import destinationImage1 from '../res/images/oslob.jpg';
import destinationImage2 from '../res/images/tumalog.jpg';
import destinationImage3 from '../res/images/sumilon.jpg';
import destinationImage4 from '../res/images/kawasan.jpg';
import footerImage from '../res/images/cebu1.jpg';

const headerTexts = [
  { title: 'Discover', location: 'Whale Sharks' },
  { title: 'Experience', location: 'Tumalog Falls' },
  { title: 'Explore', location: 'Sumilon Sandbar' },
  { title: 'Enjoy', location: 'Kawasan Falls' },
];

const typewriterVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const tourDetails = {
    name: 'Whale Shark + Tumalog Falls + Kawasan Falls + Kawasan Falls',
    ratePerPerson: ['Php 1200'],
    inclusions: [
      'Private Air-conditioned Transportation',
      'Driver and Guide',
      'All Entrance Fees',
      'Lunch',
      'Hotel Pick-up and Drop-off'
    ],
    exclusions: [
      'Personal Expenses',
      'Tips and Gratuities'
    ],
    itinerary: [
      '5:00 AM - Pick up from your hotel',
      '6:00 AM - Arrival at Oslob',
      '6:30 AM - Whale Shark Watching',
      '8:00 AM - Visit Tumalog Falls',
      '10:00 AM - Proceed to Sumilon Sandbar',
      '1:00 PM - Lunch',
      '3:00 PM - Visit Kawasan Falls',
      '5:00 PM - Departure back to your hotel'
    ],
    whatToExpect: [
      'Close encounter with Whale Sharks',
      'Guided tour of Tumalog Falls',
      'Relaxing time at Sumilon Sandbar',
      'Refreshing swim at Kawasan Falls'
    ],
    'Tumalog Falls': {
      name: 'Tumalog Falls',
      ratePerPerson: ['Php 5500'],
      inclusions: [
        'Private Air-conditioned Transportation',
        'Driver and Guide',
        'All Entrance Fees',
        'Lunch',
        'Hotel Pick-up and Drop-off'
      ],
      exclusions: [
        'Personal Expenses',
        'Tips and Gratuities'
      ],
      itinerary: [
        '5:00 AM - Pick up from your hotel',
        '6:00 AM - Arrival at Oslob',
        '6:30 AM - Whale Shark Watching',
        '8:00 AM - Visit Tumalog Falls',
        '10:00 AM - Proceed to Sumilon Sandbar',
        '1:00 PM - Lunch',
        '3:00 PM - Visit Kawasan Falls',
        '5:00 PM - Departure back to your hotel'
      ],
      whatToExpect: [
        'Close encounter with Whale Sharks',
        'Guided tour of Tumalog Falls',
        'Relaxing time at Sumilon Sandbar',
        'Refreshing swim at Kawasan Falls'
      ]
    },
    'Sumilon Sandbar': {
      name: 'Sumilon Sandbar',
      ratePerPerson: ['Php 5500'],
      inclusions: [
        'Private Air-conditioned Transportation',
        'Driver and Guide',
        'All Entrance Fees',
        'Lunch',
        'Hotel Pick-up and Drop-off'
      ],
      exclusions: [
        'Personal Expenses',
        'Tips and Gratuities'
      ],
      itinerary: [
        '5:00 AM - Pick up from your hotel',
        '6:00 AM - Arrival at Oslob',
        '6:30 AM - Whale Shark Watching',
        '8:00 AM - Visit Tumalog Falls',
        '10:00 AM - Proceed to Sumilon Sandbar',
        '1:00 PM - Lunch',
        '3:00 PM - Visit Kawasan Falls',
        '5:00 PM - Departure back to your hotel'
      ],
      whatToExpect: [
        'Close encounter with Whale Sharks',
        'Guided tour of Tumalog Falls',
        'Relaxing time at Sumilon Sandbar',
        'Refreshing swim at Kawasan Falls'
      ]
    },
    'Kawasan Falls': {
      name: 'Kawasan Falls',
      ratePerPerson: ['Php 5500'],
      inclusions: [
        'Private Air-conditioned Transportation',
        'Driver and Guide',
        'All Entrance Fees',
        'Lunch',
        'Hotel Pick-up and Drop-off'
      ],
      exclusions: [
        'Personal Expenses',
        'Tips and Gratuities'
      ],
      itinerary: [
        '5:00 AM - Pick up from your hotel',
        '6:00 AM - Arrival at Oslob',
        '6:30 AM - Whale Shark Watching',
        '8:00 AM - Visit Tumalog Falls',
        '10:00 AM - Proceed to Sumilon Sandbar',
        '1:00 PM - Lunch',
        '3:00 PM - Visit Kawasan Falls',
        '5:00 PM - Departure back to your hotel'
      ],
      whatToExpect: [
        'Close encounter with Whale Sharks',
        'Guided tour of Tumalog Falls',
        'Relaxing time at Sumilon Sandbar',
        'Refreshing swim at Kawasan Falls'
      ]
    }
  };
  
  
  
const PrivateTourPackage: React.FC = () => {
  const navigate = useNavigate();
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourDetailsModalOpen, setIsTourDetailsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState({ name: '', price: '' });

  const destinations = [
    { id: 1, name: 'Whale Shark Watching', price: 'Php 5500 / PAX', image: destinationImage1 },
    { id: 2, name: 'Tumalog Falls', price: 'Php 5500 / PAX', image: destinationImage2 },
    { id: 3, name: 'Sumilon Sandbar', price: 'Php 5500 / PAX', image: destinationImage3 },
    { id: 4, name: 'Kawasan Falls', price: 'Php 5500 / PAX', image: destinationImage4 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowIndex((prevIndex) => (prevIndex + 1) % headerTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bookDestination = (destination: { name: string; price: string }) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const showTourDetails = (destinationName: string) => {
    setSelectedDestination({ name: destinationName, price: '' });
    setIsTourDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-100">
      <TopBar />
      <div
        className="relative text-white text-center py-20"
        style={{ backgroundImage: `url(${destinations[slideshowIndex % destinations.length].image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 py-16 flex flex-col justify-center items-center h-full">
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {Array.from(headerTexts[slideshowIndex].title).map((char, i) => (
              <motion.span key={i} custom={i} variants={typewriterVariants} initial="hidden" animate="visible">
                {char}
              </motion.span>
            ))}
            <motion.span className="text-blue-500">
              {Array.from(` ${headerTexts[slideshowIndex].location}`).map((char, i) => (
                <motion.span key={i} custom={i} variants={typewriterVariants} initial="hidden" animate="visible">
                  {char}
                </motion.span>
              ))}
            </motion.span>      
          </motion.div>
          <Lottie animationData={islandAnimation} loop={true} style={{ width: 570, height: 300 }} />
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Whale Shark + Tumalog Falls + Sumilon Sandbar + Kawasan Falls
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={() => navigate('/landing')}
          >
            <button
              className="relative py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Dive In Now
            </button>
          </motion.button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(headerTexts.length)].map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${slideshowIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              ></motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <motion.div
        className="bg-white p-8"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Destinations</h2>
          <p className="text-gray-600 mb-8">
            Discover the best spots to visit in South Cebu
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map(destination => (
              <motion.div
              key={destination.id}
              className="bg-white p-4 rounded-lg shadow-md"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 * destination.id }}
            >
              <div
                className="w-full h-64 rounded-lg mb-4"
                style={{ backgroundImage: `url(${destination.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <h3 className="text-2xl font-bold">{destination.name}</h3>
              <p className="text-black-500 mt-2">{destination.price}</p>
              <button
                onClick={() => bookDestination(destination)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Book Now
              </button>
              <button
                onClick={() => showTourDetails(destination.name)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 mt-2"
              >
                Tour Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>

      {/* Booking Form Modal */}
      {isModalOpen && (
        <BookingFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedDestination.name}
          price={selectedDestination.price}
        />
      )}

    {/* Tour Details Modal */}
    {isTourDetailsModalOpen && (
        <TourDetailsModal
          isOpen={isTourDetailsModalOpen}
          onClose={() => setIsTourDetailsModalOpen(false)}
          tour={tourDetails}
        />
      )}

      {/* Footer Section */}
      <motion.div
        className="bg-black text-white py-8"
        style={{ backgroundImage: `url(${footerImage})` }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">A Best Place To Stay. Book Now!</h2>
          <button className="mb-8 p-3 bg-gray-700 rounded-full">Travelink</button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">About Us</h3>
              <ul>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Rooms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Islands and Resorts</h3>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Restaurant</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact</h3>
              <p>Address: N. Bacalso Avenue, Cebu City</p>
              <p>Phone: +63 997 682 8086</p>
              <p>Email: Travelink@gmail.com</p>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Sign up now</h3>
                <input type="text" placeholder="Email..." className="p-2 border border-gray-300 rounded w-full md:w-auto" />
                <button className="p-2 bg-gray-700 rounded ml-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivateTourPackage;
