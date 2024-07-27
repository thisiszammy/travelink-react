// src/components/RidesBookingModal.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { useAuth } from '../utils/AuthContext';
import LeafletMap from './Ridesleaflet';

interface RidesBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  price: string;
}

const RidesBookingModal: React.FC<RidesBookingModalProps> = ({ isOpen, onClose, name, price }) => {
  const { user } = useAuth();
  const [gcashNumber, setGcashNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  if (!isOpen) return null;

  const handleGetOtp = () => {
    if (gcashNumber) {
      Swal.fire({
        title: 'OTP Sent!',
        text: `An OTP has been sent to ${gcashNumber}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid GCash number.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp !== '1234') {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid OTP. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const bookingData = {
      name,
      price,
      gcashNumber,
      otp,
      downPayment,
      pickupLocation,
      dropoffLocation,
      bookedby: user?.uid,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'RidesBooked'), bookingData);
      Swal.fire({
        title: 'Success!',
        text: 'Ride booked successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error submitting form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto max-h-[90vh]">
        <div className="text-right mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Book Your Ride</h2>
          <p className="text-gray-600">Please fill in the form below to proceed with your booking.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ride-name" className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Ride Name
            </label>
            <input
              id="ride-name"
              name="name"
              type="text"
              readOnly
              value={name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="ride-price" className="flex items-center">
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Price
            </label>
            <input
              id="ride-price"
              name="price"
              type="text"
              readOnly
              value={price}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Pickup Location
            </label>
            <LeafletMap onSelectLocation={(lat, lng, address) => setPickupLocation({ lat, lng, address })} />
          </div>
          <div>
            <label className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Dropoff Location
            </label>
            <LeafletMap onSelectLocation={(lat, lng, address) => setDropoffLocation({ lat, lng, address })} />
          </div>
          <div>
            <label htmlFor="down-payment" className="flex items-center">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Down Payment
            </label>
            <input
              id="down-payment"
              name="down-payment"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Down Payment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gcash-number" className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              GCash Number
            </label>
            <input
              id="gcash-number"
              name="gcash-number"
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="GCash Number"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
            />
            <button
              type="button"
              onClick={handleGetOtp}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-2"
            >
              Send OTP
            </button>
          </div>
          <div>
            <label htmlFor="otp" className="flex items-center">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RidesBookingModal;
