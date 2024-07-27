import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import cebuBay from '../../res/images/cebucity1.jpg';
import cebuBay1 from '../../res/images/oslob.jpg';
import cebuBay2 from '../../res/images/moalboal.jpg';
import cebuBay3 from '../../res/images/dumanjug.jpg';
import cebuBay4 from '../../res/images/sumilon.jpg';
import cebuBay5 from '../../res/images/bantayan.jpg';
import cebuBay6 from '../../res/images/cebu2.jpg';
import lastMinuteDealImage from '../../res/images/last-minute.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCar, faStar, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import TopBar from '../../components/LandingNavBar';
import Lottie from 'lottie-react';
import animationData from '../../res/animations/Traveling.json';
import { motion } from 'framer-motion';
import TourDetailsModal from '../TourDetailsModal';
import BookingFormModal from '../bookingForm/BookingFormModal';

const images = [cebuBay, cebuBay1, cebuBay2, cebuBay3, cebuBay4, cebuBay5, cebuBay6];

const recommendedDestinations = [
  { name: 'Ginatilan Beach', image: cebuBay1, ratePerPerson: ["₱6400", "₱5200", "₱4800"], inclusions: ["Private Tour", "Transportation", "Guide"], exclusions: ["Camera Rental"], itinerary: ["04:00AM – Hotel pick up", "06:30AM – ETA Oslob", "07:00AM – Swim with the whale sharks"], whatToExpect: ["Pick up from hotel", "Light breakfast", "Swim with whale sharks"] },
  { name: 'Oslob Scuba-Diving', image: cebuBay2, ratePerPerson: ["₱4200", "₱4000", "₱3800"], inclusions: ["Scuba-Diving", "Transportation", "Guide"], exclusions: ["Diving gear rental"], itinerary: ["05:00AM – Hotel pick up", "07:00AM – ETA Oslob", "08:00AM – Dive"], whatToExpect: ["Pick up from hotel", "Dive briefing", "Underwater adventure"] },
  { name: 'Dumanjug Beach', image: cebuBay3, ratePerPerson: ["₱3700", "₱3600", "₱3500"], inclusions: ["Beach access", "Transportation", "Guide"], exclusions: ["Food and drinks"], itinerary: ["06:00AM – Hotel pick up", "08:00AM – ETA Dumanjug", "09:00AM – Beach time"], whatToExpect: ["Pick up from hotel", "Beach activities", "Relaxation"] },
  { name: 'Sumilon Island', image: cebuBay4, ratePerPerson: ["₱3400", "₱3300", "₱3200"], inclusions: ["Beach access", "Transportation", "Guide"], exclusions: ["Food and drinks"], itinerary: ["07:00AM – Hotel pick up", "09:00AM – ETA Sumilon", "10:00AM – Beach time"], whatToExpect: ["Pick up from hotel", "Beach activities", "Relaxation"] },
  { name: 'Bantayan Island', image: cebuBay5, ratePerPerson: ["₱3100", "₱3000", "₱2900"], inclusions: ["Scuba-Diving", "Transportation", "Guide"], exclusions: ["Diving gear rental"], itinerary: ["05:00AM – Hotel pick up", "07:00AM – ETA Bantayan", "08:00AM – Dive"], whatToExpect: ["Pick up from hotel", "Dive briefing", "Underwater adventure"] }
];

const findPlaces = [
  { name: 'Oslob Scuba-Diving', image: cebuBay1, rating: 4, likes: '23k' },
  { name: 'Dumanjug Beach', image: cebuBay2, rating: 5, likes: '12k' },
  { name: 'Bantayan Island', image: cebuBay3, rating: 3, likes: '5k' },
  { name: 'Sumilon Island', image: cebuBay4, rating: 4.5, likes: '18k' },
  { name: 'Cebu Bay', image: cebuBay5, rating: 4, likes: '10k' },
];

const headerTexts = [
  { title: "DISCOVER THE BEAUTY OF", location: "CEBU" },
  { title: "EXPLORE THE WONDERS OF", location: "OSLOB" },
  { title: "DIVE INTO THE ADVENTURE AT", location: "DUMANJUG" },
  { title: "ENJOY THE SERENITY OF", location: "SUMILON ISLAND" },
  { title: "EXPERIENCE THE CHARM OF", location: "BANTAYAN ISLAND" },
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

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [popularCount, setPopularCount] = useState(4);
  const [cityTourCount, setCityTourCount] = useState(4);
  const [beachTourCount, setBeachTourCount] = useState(4);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ name: '', price: '' });

  const recommendedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowIndex((prevIndex) => (prevIndex + 1) % headerTexts.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  const showMorePopular = () => setPopularCount((prev) => Math.min(prev + 4, 10));
  const closePopular = () => setPopularCount(4);
  const showMoreCityTours = () => setCityTourCount((prev) => Math.min(prev + 4, 10));
  const closeCityTours = () => setCityTourCount(4);
  const showMoreBeachTours = () => setBeachTourCount((prev) => Math.min(prev + 4, 10));
  const closeBeachTours = () => setBeachTourCount(4);

  const handleBookNow = (name: string, price: string) => {
    setBookingDetails({ name, price });
    setIsBookingFormOpen(true);
  };

  const handleShowDetails = (tour: any) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleExploreClick = () => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-100">
      <TopBar />
      <div
        className="relative text-white text-center py-20"
        style={{ backgroundImage: `url(${images[slideshowIndex % images.length]})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
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
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            LET US TAKE YOU TO THE QUEEN CITY OF THE SOUTH
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

      <div className="flex justify-center py-8">
        <Lottie animationData={animationData} loop={true} style={{ width: 400, height: 300 }} />
      </div>

      <div className="bg-blue-100 py-12">
        <div className="container mx-auto text-left">
          <div className="bg-blue-200 py-6 px-4 rounded-lg shadow-md relative">
            <img src={lastMinuteDealImage} alt="Last Minute Deal" className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Last-minute deals for every budget</h2>
            <p className="mb-4">Pay less to travel the world and save at least 15% off your next trip</p>
            <button
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-blue-500 rounded-md group"
            >
              <span
                className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-700 rounded group-hover:-mr-4 group-hover:-mt-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-700 rounded group-hover:-ml-4 group-hover:-mb-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-blue-600 rounded-md group-hover:translate-x-0"
              ></span>
              <span
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              >Show Me Deals</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-200 py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-20 mb-4">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faHotel} className="text-4xl text-black cursor-pointer" onClick={() => navigate('/hotels')} />
              <span className="text-black mt-2">Hotels</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCar} className="text-4xl text-black cursor-pointer" onClick={() => navigate('/rides')} />
              <span className="text-black mt-2">Car Service</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Find Places Near You</h2>
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-auto">
            <div className="flex">
              {findPlaces.map((place, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 transition-transform duration-700 ${index === slideshowIndex ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                  style={{ transform: `translateX(-${slideshowIndex * 100}%)` }}
                >
                  <img src={place.image} alt={place.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{place.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">{place.rating}</span>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">{place.likes}</span>
                        <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookNow(place.name, '')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => handleShowDetails(recommendedDestinations[index])}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-2"
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              {findPlaces.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${index === slideshowIndex ? 'bg-blue-700' : 'bg-gray-300'}`}
                  onClick={() => setSlideshowIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-12" ref={recommendedRef}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-center mb-8">Recommended Destinations</h2>
          <div className="flex justify-center space-x-4 flex-wrap">
            {recommendedDestinations.map((destination, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden w-64 mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <img src={destination.image} alt={destination.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-600">Cebu, Philippines</p>
                  <button
                    onClick={() => handleBookNow(destination.name, '')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleShowDetails(destination)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-2"
                  >
                    Show Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Popular this month</h2>
        <div className="flex justify-center space-x-4 flex-wrap">
          {Array.from({ length: popularCount }).map((_, item) => (
            <motion.div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden w-64 mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: item * 0.2 }}
            >
              <img src={images[item % images.length]} alt="Tour Package" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Olango Island</h3>
                <p className="text-gray-600">Cebu, Philippines</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-700 font-bold">3 days</span>
                </div>
                <button
                  onClick={() => handleBookNow('Olango Island', '')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleShowDetails(recommendedDestinations[item % recommendedDestinations.length])}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-2"
                >
                  Show Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-right mt-4 flex justify-end space-x-4">
          {popularCount < 10 && (
            <button onClick={showMorePopular} title="Add New"
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                className="stroke-indigo-400 fill-none group-hover:fill-indigo-800 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke-width="1.5"
                ></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
          )}
          {popularCount > 4 && (
            <button onClick={closePopular} className="bg-red-500 text-white py-2 px-4 rounded-full"><FontAwesomeIcon icon={faTimes} /></button>
          )}
        </div>
      </div>

      <div className="bg-blue-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">City Tours</h2>
          <p className="text-center mb-4">Check out these trendy tour plans!</p>
          <div className="flex justify-center space-x-4 flex-wrap">
            {Array.from({ length: cityTourCount }).map((_, item) => (
              <motion.div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden w-64 mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: item * 0.2 }}
              >
                <img src={images[(item + 1) % images.length]} alt="Tour Package" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Cebu City Tour Package</h3>
                  <p className="text-gray-600">Cebu, Philippines</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-700 font-bold">5 days</span>
                  </div>
                  <button
                    onClick={() => handleBookNow('Cebu City Tour Package', '')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleShowDetails(recommendedDestinations[item % recommendedDestinations.length])}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-2"
                  >
                    Show Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-right mt-4 flex justify-end space-x-4">
            {cityTourCount < 10 && (
              <button onClick={showMoreCityTours} title="Add New"
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  className="stroke-indigo-400 fill-none group-hover:fill-indigo-800 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke-width="1.5"
                  ></path>
                  <path d="M8 12H16" stroke-width="1.5"></path>
                  <path d="M12 16V8" stroke-width="1.5"></path>
                </svg>
              </button>
            )}
            {cityTourCount > 4 && (
              <button onClick={closeCityTours} className="bg-red-500 text-white py-2 px-4 rounded-full"><FontAwesomeIcon icon={faTimes} /></button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-200 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Beach Tours</h2>
          <p className="text-center mb-4">Check out these trendy tour plans!</p>
          <div className="flex justify-center space-x-4 flex-wrap">
            {Array.from({ length: beachTourCount }).map((_, item) => (
              <motion.div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden w-64 mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: item * 0.2 }}
              >
                <img src={images[(item + 2) % images.length]} alt="Tour Package" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">South Cebu Tour Package</h3>
                  <p className="text-gray-600">Cebu, Philippines</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-700 font-bold">2 days</span>
                  </div>
                  <button
                    onClick={() => handleBookNow('South Cebu Tour Package', '')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleShowDetails(recommendedDestinations[item % recommendedDestinations.length])}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ml-2"
                  >
                    Show Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-right mt-4 flex justify-end space-x-4">
            {beachTourCount < 10 && (
              <button onClick={showMoreBeachTours}
                title="Add New"
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  className="stroke-indigo-400 fill-none group-hover:fill-indigo-800 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke-width="1.5"
                  ></path>
                  <path d="M8 12H16" stroke-width="1.5"></path>
                  <path d="M12 16V8" stroke-width="1.5"></path>
                </svg>
              </button>
            )}
            {beachTourCount > 4 && (
              <button onClick={closeBeachTours} className="bg-red-500 text-white py-2 px-4 rounded-full"><FontAwesomeIcon icon={faTimes} /></button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-cover bg-center py-12 text-white text-center" style={{ backgroundImage: `url(${cebuBay3})` }}>
        <div className="bg-black bg-opacity-50 py-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-4">100 + Travel Destinations and over 300 + Trips Made</h2>
            <div className="testimonial mt-8">
              <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg inline-block">
                <p className="text-gray-800 italic">Our GITHUB</p>
                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center gap-4">
                    <button className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900">
                      <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                      Github
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTour && (
        <TourDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tour={selectedTour}
        />
      )}

      {isBookingFormOpen && (
        <BookingFormModal
          isOpen={isBookingFormOpen}
          onClose={() => setIsBookingFormOpen(false)}
          name={bookingDetails.name}
          price={bookingDetails.price}
        />
      )}
    </div>
  );
};

export default Landing;

