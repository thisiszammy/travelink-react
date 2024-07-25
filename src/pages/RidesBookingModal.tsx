// src/components/bookingForm/RidesBookingModal.tsx
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faTag, faMoneyBill, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import LeafletMap from '../pages/Ridesleaflet';
import Swal from 'sweetalert2';

interface RidesBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  price: string;
}

const RidesBookingModal: React.FC<RidesBookingModalProps> = ({ isOpen, onClose, name, price }) => {
  const [numPassengers, setNumPassengers] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseFloat(price));
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const handleNumPassengersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumPassengers = parseInt(event.target.value, 10);
    setNumPassengers(newNumPassengers);
    setTotalPrice(newNumPassengers * parseFloat(price));
  };

  const handlePickupLocationSelect = (lat: number, lng: number, address: string) => {
    setPickupLocation(address);
  };

  const handleDropoffLocationSelect = (lat: number, lng: number, address: string) => {
    setDropoffLocation(address);
  };

  const handleOtpRequest = () => {
    setOtp('1234');
    toast.info('OTP has been sent to your GCash number.', {});
  };

  const clearForm = () => {
    setNumPassengers(1);
    setTotalPrice(parseFloat(price));
    setPickupLocation('');
    setDropoffLocation('');
    setGcashNumber('');
    setOtp('');
    setDownPayment('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!numPassengers || !totalPrice || !pickupLocation || !dropoffLocation || !gcashNumber || !otp || !downPayment) {
      toast.error('All fields are required. Please fill out the form completely.', {});
      return;
    }

    if (otp !== '1234') {
      toast.error('Invalid OTP. Please try again.', {});
      return;
    }

    const bookingData = {
      rideName: name,
      ridePrice: price,
      numPassengers,
      totalPrice,
      pickupLocation,
      dropoffLocation,
      gcashNumber,
      otp,
      downPayment,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'BookingRides'), bookingData);
      toast.success('Your Ride will soon arrive!', {});
      onClose();
      Swal.fire({
        title: 'Success!',
        text: 'Your ride has been booked successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      clearForm();
    } catch (error) {
      toast.error('Error booking ride. Please try again.', {});
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Your Ride</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto" style={{ maxHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="space-y-6" style={{ width: '100%', margin: '0 auto' }}>
          <div className="mb-3">
            <label htmlFor="ride-name" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Ride Name
            </label>
            <input
              id="ride-name"
              name="ride-name"
              type="text"
              readOnly
              value={name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ride-price" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
              Price Per Person
            </label>
            <input
              id="ride-price"
              name="ride-price"
              type="text"
              readOnly
              value={`₱${price}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="num-passengers" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Number of Passengers
            </label>
            <input
              id="num-passengers"
              name="num-passengers"
              type="number"
              min="1"
              value={numPassengers}
              onChange={handleNumPassengersChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="total-price" className="block text-lg font-medium text-gray-700">
              Total Price
            </label>
            <input
              id="total-price"
              name="total-price"
              type="text"
              readOnly
              value={`₱${totalPrice.toFixed(2)}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pickup-location" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Pick-up Location
            </label>
            <input
              id="pickup-location"
              name="pickup-location"
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Pick-up location"
            />
            <LeafletMap onSelectLocation={handlePickupLocationSelect} />
          </div>
          <div className="mb-3">
            <label htmlFor="dropoff-location" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Drop-off Location
            </label>
            <input
              id="dropoff-location"
              name="dropoff-location"
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Drop-off location"
            />
            <LeafletMap onSelectLocation={handleDropoffLocationSelect} />
          </div>
          <div className="mb-3">
            <label htmlFor="down-payment" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
              Down Payment
            </label>
            <input
              id="down-payment"
              name="down-payment"
              type="text"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Enter down payment"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gcash-number" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
              GCash Number
            </label>
            <input
              id="gcash-number"
              name="gcash-number"
              type="text"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Enter GCash number"
            />
            <button
              type="button"
              onClick={handleOtpRequest}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send OTP
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Enter OTP"
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
        <ToastContainer />
      </Modal.Body>
    </Modal>
  );
};

export default RidesBookingModal;
