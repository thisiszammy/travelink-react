import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faSnowflake, faCogs } from '@fortawesome/free-solid-svg-icons';
import TopBar from '../components/LandingNavBar';
import RidesBookingModal from './RidesBookingModal';
import rideImage1 from '../res/images/ride1.jpg';
import rideImage2 from '../res/images/ride2.jpg';
import rideImage3 from '../res/images/ride3.jpg';
import featuredProperty1 from '../res/images/bmw.jpg';
import featuredProperty2 from '../res/images/hyundai.jpg';
import featuredProperty3 from '../res/images/mazda.jpg';
import footerImage from '../res/images/ride6.jpg';
import offerImage1 from '../res/images/fortuner.jpg';
import offerImage2 from '../res/images/civic.jpg';
import offerImage3 from '../res/images/ford.jpg';
import rentImage1 from '../res/images/rent1.jpg';
import rentImage2 from '../res/images/rent2.jpg';

const rideImages = [rideImage1, rideImage2, rideImage3];
const headerTexts = [
  { title: "EXPLORE CEBU", type: " WITHOUT TAKING PUBLIC BUSES" },
  { title: "UNWIND WITH", type: " CAR RIDES" },
  { title: "ITS ALL CHEAP", type: " IN HERE" },
];

const typewriterVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const Rides: React.FC = () => {
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<{ name: string; price: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowIndex((prevIndex) => (prevIndex + 1) % headerTexts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (name: string, price: string) => {
    setSelectedRide({ name, price });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-100">
      <TopBar />
      <div className="relative text-white text-center py-20" style={{ backgroundImage: `url(${rideImages[slideshowIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 py-16">
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {Array.from(headerTexts[slideshowIndex].title).map((char, i) => (
              <motion.span key={i} custom={i} variants={typewriterVariants} initial="hidden" animate="visible">
                {char}
              </motion.span>
            ))}
            <motion.span className="text-red-500">
              {Array.from(headerTexts[slideshowIndex].type).map((char, i) => (
                <motion.span key={i} custom={i} variants={typewriterVariants} initial="hidden" animate="visible">
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            CHOOSE YOUR RIDE AND CALCULATE YOUR COST
          </motion.p>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {rideImages.map((_, index) => (
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

      <div className="p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">Ongoing Offers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={offerImage1} alt="Offer 1" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Toyota Fortuner</h2>
              <ul className="text-gray-600 mt-2">
                <li>Model : 2021</li>
                <li>8 Seater</li>
                <li>Original Price: Php 1,499 Whole Tour</li>
                <li>20% OFF </li>
                <li>Discounted Price: Php 1,199 Whole Tour</li>
              </ul>
              <button
                onClick={() => handleBookNow('Toyota Fortuner', '1199')}
                className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span
                  className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                  className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                >
                  Book Now
                </span>
              </button>
            </div>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={offerImage2} alt="Offer 2" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Honda Civic</h2>
              <ul className="text-gray-600 mt-2">
                <li>Model: 2023</li>
                <li>5 Seater</li>
                <li>Original Price: Php 1,899 Whole Tour</li>
                <li>30% OFF</li>
                <li>Discounted Price: Php 1,329 Whole Tour</li>
              </ul>
              <button
                onClick={() => handleBookNow('Honda Civic', '1329')}
                className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span
                  className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                  className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                >
                  Book Now
                </span>
              </button>
            </div>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={offerImage3} alt="Offer 3" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Ford Ranger</h2>
              <ul className="text-gray-600 mt-2">
                <li>Model: 2024</li>
                <li>6 Seater</li>
                <li>Original Price: Php 2,499 Whole Tour</li>
                <li>35% OFF</li>
                <li>Discounted Price: Php 1,874 Whole Tour</li>
              </ul>
              <button
                onClick={() => handleBookNow('Ford Ranger', '1874')}
                className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span
                  className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                >
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                  className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                >
                  Book Now
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-12 bg-gradient-to-r from-blue-200 to-blue-700">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12">We Serve you the BEST</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={rentImage1} alt="Food 1" className="w-full h-64 object-cover rounded-t-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">Why us?</h2>
            <p className="text-gray-700 mb-6 text-center">
              Why choose Travelink Car Rentals? Because we offer a seamless car rental experience with competitive prices, a diverse fleet of vehicles, and exceptional customer service. Whether you're traveling for business or leisure, our convenient locations and flexible rental options ensure you have the right car for your needs. Plus, with our easy booking process and 24/7 roadside assistance, you can travel with confidence and peace of mind.
            </p>
            <button
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
            >
              <span
                className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
              ></span>
              <span
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              >
                Learn More
              </span>
            </button>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={rentImage2} alt="Food 2" className="w-full h-64 object-cover rounded-t-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">Cheaper than Ever</h2>
            <p className="text-gray-700 mb-6 text-center">
              Cheaper than Ever! At Travelink Car Rentals, we are committed to providing the best value for your money. Our affordable rates ensure you get the most budget-friendly options without compromising on quality. Take advantage of our special deals, discounts, and loyalty programs to save even more on your next rental. Experience top-notch service and reliable vehicles at prices that can't be beaten. Book with us today and enjoy a cost-effective and hassle-free car rental experience!
            </p>
            <button
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
            >
              <span
                className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
              ></span>
              <span
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              >
                Learn More
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={featuredProperty1} alt="Property 1" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">BMW</h2>
              <p className="text-gray-600">Price: Php 2,899</p>
              <p className="text-gray-600 mt-2">Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600"><FontAwesomeIcon icon={faChair} className="mr-1" />5 seater</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faSnowflake} className="mr-1" />Cold Aircon</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faCogs} className="mr-1" />Manual</span>
                <button
                  onClick={() => handleBookNow('BMW', '2899')}
                  className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                >
                  <span
                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                  ></span>
                  <span
                    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                  >
                    Book Now
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={featuredProperty2} alt="Property 2" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Hyundai</h2>
              <p className="text-gray-600">Price: Php 3,699</p>
              <p className="text-gray-600 mt-2">Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600"><FontAwesomeIcon icon={faChair} className="mr-1" />8 seater</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faSnowflake} className="mr-1" />Cold Aircon</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faCogs} className="mr-1" />Automatic</span>
                <button
                  onClick={() => handleBookNow('Hyundai', '3699')}
                  className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                >
                  <span
                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                  ></span>
                  <span
                    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                  >
                    Book Now
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={featuredProperty3} alt="Property 3" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Mazda</h2>
              <p className="text-gray-600">Price: Php 4,299</p>
              <p className="text-gray-600 mt-2">Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600"><FontAwesomeIcon icon={faChair} className="mr-1" />5 seater</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faSnowflake} className="mr-1" />Cold Aircon</span>
                <span className="text-gray-600"><FontAwesomeIcon icon={faCogs} className="mr-1" />Automatic</span>
                <button
                  onClick={() => handleBookNow('Mazda', '4299')}
                  className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                >
                  <span
                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                  ></span>
                  <span
                    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                  >
                    Book Now
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative text-center py-12" style={{ backgroundImage: `url(${footerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <h3 className="text-xl font-bold mb-2">Travelink Car Rentals</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-blue-500"><i className="fa fa-facebook"></i></a>
                <a href="#" className="text-white hover:text-blue-500"><i className="fa fa-twitter"></i></a>
                <a href="#" className="text-white hover:text-blue-500"><i className="fa fa-instagram"></i></a>
                <a href="#" className="text-white hover:text-blue-500"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Get Info</h3>
              <p>Address: N. Bacalso Avenue, Cebu City</p>
              <p>Phone: +63 997 682 8086</p>
              <p>Email: Travelink@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Destinations</h3>
              <ul className="space-y-2">
                <li>Kawasan Falls</li>
                <li>Oslob Cebu</li>
                <li>Olango Island</li>
                <li>Sumilon Island</li>
                <li>Moalboal</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Newsletter</h3>
              <p>Subscribe to our newsletter to get notification about new updates, etc.</p>
              <form className="mt-4">
                <input type="email" placeholder="Enter your email..." className="p-2 rounded-l-lg text-black" />
                <button type="submit" className="p-2 bg-blue-500 rounded-r-lg text-white"><i className="fa fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 All rights reserved | Cebu Car Rentals <i className="fa fa-heart text-red-500"></i> Travelink</p>
          </div>
        </div>
      </footer>
      {selectedRide && (
        <RidesBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedRide.name}
          price={selectedRide.price}
        />
      )}
    </div>
  );
};

export default Rides;
