import React, { useState, useEffect } from 'react';
import './search-trip-page.css';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableTrips, getDocs } from '../../data/firebaseConfig';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import BookingForm from '../bookingForm/BookingForm';
import TopBar from '../../components/LandingNavBar';

interface Trip {
  id: string;
  DestinationName: string;
  Price: string;
  Rating: string;
  Inclusions: string[];
  FeaturedPhotos: { downloadUrl: string }[];
  Description: string;
  Activities: { caption: string, downloadUrl: string }[];
}

const SearchTrip: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<Trip[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(TableTrips);
        const tripsList: Trip[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Trip;
          console.log('Fetched trip data:', data); // Debugging log
          return {
            id: doc.id,
            DestinationName: data.DestinationName,
            Price: data.Price,
            Rating: data.Rating || '⭐️⭐️⭐️⭐️⭐️',
            Inclusions: data.Inclusions || [],
            FeaturedPhotos: data.FeaturedPhotos || [],
            Description: data.Description || '',
            Activities: data.Activities || [],
          };
        });
        setTrips(tripsList);
        setFilteredResults(tripsList);
      } catch (error) {
        console.error('Error fetching trips: ', error);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    setFilteredResults(
      trips.filter((trip) =>
        trip.DestinationName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, trips]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderContent = () => {
    if (!selectedTrip) {
      return <div>Select a trip to see more details</div>;
    }
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-semibold text-xl mb-2">About</h2>
            <p>{selectedTrip.Description}</p>
            <h2 className="font-semibold text-xl mt-4 mb-2">Things to do in {selectedTrip.DestinationName}</h2>
            <div className="activities grid grid-cols-2">
              {selectedTrip.Activities.length > 0 ? (
                selectedTrip.Activities.map((activity, index) => (
                  <div className='w-full h-full'>
                    <img src={activity.downloadUrl}
                        alt={`activity preview ${index}`}
                        className='hover:scale-125 ease-in-out duration-300 w-full h-[250px] object-cover rounded-tl-[8px] rounded-tr-[8px]'/>
                    <div key={index} className="activity-card h-[100px] flex justify-center items-center">{activity.caption}</div>
                  </div>
                ))
              ) : (
                <p>No activities available.</p>
              )}
            </div>
          </motion.div>
        );
      case 'Reviews':
        return (
          <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-semibold text-xl mb-2">Reviews</h2>
            <p>4.6 <span className="stars">★★★★★</span> (205 reviews)</p>
            <div className="reviews space-y-2 mt-2">
              <div className="review-card">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
              <div className="review-card">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
              <div className="review-card">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
            </div>
          </motion.div>
        );
      case 'Price':
        console.log('Selected trip inclusions:', selectedTrip.Inclusions); // Debugging log
        return (
          <motion.div className="flex tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className='flex-1'>
              <h2 className="font-semibold text-xl mb-2">Inclusions</h2>
              <ul className="list-disc flex-col items-start">
                {selectedTrip.Inclusions.length > 0 ? (
                  selectedTrip.Inclusions.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))
                ) : (
                  <li>No inclusions available.</li>
                )}
              </ul>
            </div>
            <div className='flex-col justify-end'>
              <h2 className="font-semibold text-xl mb-2">Accepted Payment Channels</h2>
              <div className="payment-channels flex w-full justify-end">
                <img src={require('../../res/images/visa.png')} alt="VISA" title='VISA' className="payment-icon" />
                <img src={require('../../res/images/mastercard.png')} alt="MasterCard" title='MasterCard' className="payment-icon" />
                <img src={require('../../res/images/paypal.png')} alt="PayPal" title='PayPal' className="payment-icon" />
                <img src={require('../../res/images/gcash.jpg')} alt="GCash" title='GCash' className="payment-icon" />
              </div>
              <div className='flex justify-end'>
                <button
                  className="book-now mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded"
                  onClick={open}
                >
                  Book now!
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="ml-[100px] mt-[50px]">
      <TopBar/>
        <Modal opened={opened} onClose={close} title="Booking Form" size='100%'>
          <BookingForm
          id={selectedTrip?.id || "Error getting back Trip ID"} 
          DestinationName={selectedTrip?.DestinationName || "Error getting back destination name"}
          close={close}/>
        </Modal>
        <main className="main flex mt-4">
          <aside className="sidebar relative w-1/3 p-4 m-4 bg-blue-100 h-screen">
            <div className='sticky top-0 bg-white p-4 mb-4 z-10 rounded'>
              <input
                type="text"
                className="search-bar w-full p-2 border rounded mb-2"
                placeholder="Search destinations"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="filter-button w-full p-2 bg-blue-500 text-white rounded mb-4">
                Relevant
              </button>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              {filteredResults.map((result) => (
                <motion.div
                  key={result.id}
                  className="result-item p-4 border rounded bg-white"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTrip(result)}
                >
                  <img src={result.FeaturedPhotos[0]?.downloadUrl} alt={result.DestinationName} className="result-image mb-2" />
                  <h2 className="text-xl font-bold">{result.DestinationName}</h2>
                  <p className="text-lg">₱{result.Price}</p>
                  <div className="icons flex space-x-2 mt-2">
                    <span>{result.Rating}</span>
                    {result.Inclusions.map((amenity, idx) => (
                      <span key={idx}>{amenity}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </aside>
          <section className="content w-2/3 p-4 m-4 bg-white rounded shadow">
            <div className="tabs flex space-x-4 mb-4">
              <button
                className={`tab ${activeTab === 'Overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('Overview')}
              >
                Overview
              </button>
              <button
                className={`tab ${activeTab === 'Reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('Reviews')}
              >
                Reviews
              </button>
              <button
                className={`tab ${activeTab === 'Price' ? 'active' : ''}`}
                onClick={() => setActiveTab('Price')}
              >
                Price
              </button>
            </div>
            <div className="tab-content-container">{renderContent()}</div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SearchTrip;

