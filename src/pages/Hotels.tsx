import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import hotelAnimation from '../res/animations/Hotel.json'; 
import TopBar from '../components/LandingNavBar';
import HotelBookingModal from './HotelBookingModal';

import backgroundImage from '../res/images/background.jpg';
import hotelRoomImage from '../res/images/hotelroom.jpg';
import personImage from '../res/images/person.jpg';
import singleRoomImage from '../res/images/hotelroom1.jpg';
import familyRoomImage from '../res/images/hotelroom2.jpg';
import presidentialRoomImage from '../res/images/presidential.png';
import cozyRoomIcon from '../res/images/cozyroom.jpg';
import familyImage from '../res/images/fam.jpg';
import specialOffersIcon from '../res/images/deals.jpg';
import restaurantImage from '../res/images/restaurant.jpg';
import dishImage1 from '../res/images/cebu1.jpg';
import dishImage2 from '../res/images/cebu2.jpg';
import dishImage3 from '../res/images/cebu3.jpg';

const Hotels: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<{ name: string; price: string } | null>(null);
  const navigate = useNavigate();
  const recommendedRef = useRef<HTMLDivElement>(null);

  const [hotels] = useState([
    { id: 1, name: 'Single Room', price: 'Php 1999 / PER NIGHT', image: singleRoomImage },
    { id: 2, name: 'Family Room', price: 'Php 6999 / PER NIGHT', image: familyRoomImage },
    { id: 3, name: 'Presidential Room', price: 'Php 8999 / PER NIGHT', image: presidentialRoomImage },
  ]);

  const bookHotel = (hotel: { name: string; price: string }) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleExploreClick = () => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-screen object-cover" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.div
            className="flex justify-center py-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Lottie animationData={hotelAnimation} loop={true} style={{ width: 400, height: 300 }} />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A Best Place To Stay
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Welcome to the Hotels in Cebu 
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={handleExploreClick}
          >
            <button
              className="relative py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Explore Now
            </button>
          </motion.button>
        </div>
      </div>

      {/* Welcome Section */}
      <motion.div
        className="bg-gray-50 p-8"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 p-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-600 mb-4">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
              there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
              Semantics, a large language ocean.
            </p>
            <div className="flex items-center space-x-4">
              <button
                className="relative py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              >
                Learn More!
              </button>
              <span className="text-gray-500">or</span>
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-300">SEE VIDEO</a>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-4 relative"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            <img src={hotelRoomImage} alt="Hotel Room" className="w-full h-auto rounded-lg shadow-md" />
            <img src={personImage} alt="Person" className="absolute bottom-0 right-0 w-24 h-24 rounded-full border-4 border-white shadow-lg transform translate-x-1/2 translate-y-1/2" />
          </motion.div>
        </div>
      </motion.div>

      {/* Rooms & Suites Section */}
      <motion.div
        className="bg-white p-8"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center" ref={recommendedRef}>
          <h2 className="text-4xl font-bold mb-4">Rooms & Suites</h2>
          <p className="text-gray-600 mb-8">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
            Semantics, a large language ocean.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map(hotel => (
              <motion.div
                key={hotel.id}
                className="bg-white p-4 rounded-lg shadow-md"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.2 * hotel.id }}
              >
                <div
                  className="w-full h-64 rounded-lg mb-4"
                  style={{ backgroundImage: `url(${hotel.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <h3 className="text-2xl font-bold">{hotel.name}</h3>
                <p className="text-black-500 mt-2">{hotel.price}</p>
                <button
                  onClick={() => bookHotel({ name: hotel.name, price: hotel.price })}
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-900/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-black transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
                >
                  <span className="text-lg">Book Now</span>
                  <div
                    className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                  >
                    <div className="relative h-full w-10 bg-white/30"></div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Unwind Section */}
      <motion.div
        className="bg-gray-100 p-8"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src={cozyRoomIcon} alt="Cozy Room Icon" className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Cozy Room</h3>
              <p className="text-gray-600 text-center">Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </motion.div>
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div
                className="w-full h-64 rounded-lg mb-4"
                style={{ backgroundImage: `url(${familyImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            </motion.div>
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src={specialOffersIcon} alt="Special Offers Icon" className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Special Offers</h3>
              <p className="text-gray-600 text-center">Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </motion.div>
          </div>
          <motion.div
            className="w-full md:w-1/2 p-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">Unwind A Hotel Booking Agency</h2>
            <p className="text-gray-600 mb-8">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
              there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
              Semantics, a large language ocean.
            </p>
            <button className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Get Cozy
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Restaurant & Bar Section */}
      <motion.div
        className="bg-gray-50 p-8"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 p-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <div
              className="w-full h-64 rounded-lg mb-4"
              style={{ backgroundImage: `url(${restaurantImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 p-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">Travelink Restaurant & Bar</h2>
            <p className="text-gray-600 mb-8">
            Behind the bustling city streets, nestled between the scenic landscapes and serene coastal views, 
            lies Travelink Restaurant and Bar. Separated from the ordinary, it resides in a hidden oasis right at the edge of the Culinary Coast, 
            where flavors blend seamlessly with the tranquil ambiance of a gastronomic paradise.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={dishImage1} alt="Dish 1" className="w-12 h-12 rounded-full mr-4" />
                  <span className="text-gray-800">Grilled Beef with potatoes</span>
                </div>
                <span className="text-black-500">Php 999.00</span>
                <button className="bg-blue-500 text-white p-2 rounded-full">Order</button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={dishImage2} alt="Dish 2" className="w-12 h-12 rounded-full mr-4" />
                  <span className="text-gray-800">Ultimate Overload</span>
                </div>
                <span className="text-black-500">Php 999.00</span>
                <button className="bg-blue-500 text-white p-2 rounded-full">Order</button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={dishImage3} alt="Dish 3" className="w-12 h-12 rounded-full mr-4" />
                  <span className="text-gray-800">Ham & Pineapple</span>
                </div>
                <span className="text-black-500">Php 499.00</span>
                <button className="bg-blue-500 text-white p-2 rounded-full">Order</button>
              </div>
              {/* Add more dishes as needed */}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        className="bg-black text-white py-8"
        style={{ backgroundImage: `url(${dishImage1})` }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">A Best Place To Stay. Reserve Now!</h2>
          <button className="mb-8 p-3 bg-gray-700 rounded-full">Reserve Now</button>
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
              <h3 className="font-bold mb-2">The Rooms & Suites</h3>
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

      {selectedHotel && (
        <HotelBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedHotel.name}
          price={selectedHotel.price}
        />
      )}
    </div>
  );
};

export default Hotels;
