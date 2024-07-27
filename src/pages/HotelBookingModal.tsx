import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faCity, faMapMarkerAlt, faMailBulk, faPhone, faTag } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { useAuth } from '../utils/AuthContext';
import emailjs from 'emailjs-com';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  price: string;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose, name, price }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [otp, setOtp] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [isPayPalConfirmed, setIsPayPalConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const bookingData = {
      name: formData.get('name'),
      price: formData.get('price'),
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      checkIn: formData.get('check-in'),
      checkOut: formData.get('check-out'),
      adults: formData.get('adults'),
      children: formData.get('children'),
      bookedby: user?.uid,
      timestamp: new Date(),
      paymentMethod,
      paymentDetails: formData.get('payment-details'),
      downPayment,
    };

    if (paymentMethod === 'GCash' && otp !== '1234') {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid OTP. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (paymentMethod === 'PayPal' && !isPayPalConfirmed) {
      Swal.fire({
        title: 'Error!',
        text: 'Please confirm your PayPal payment before submitting.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await addDoc(collection(db, 'BookedHotelRooms'), bookingData); 
      Swal.fire({
        title: 'Success!',
        text: 'Booked successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error submitting form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleGetOtp = () => {
    if (gcashNumber) {
      Swal.fire({
        title: 'OTP Sent!',
        text: `An OTP has been sent to ${gcashNumber}.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid GCash number.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handlePayPalConfirm = async (email: string, amount: string) => {
    const confirmationUrl = `http://localhost:3000/confirmation?email=${email}&amount=${amount}`;
  
    const templateParams = {
      to_name: 'Customer',
      from_name: 'Travelink',
      to_email: email,
      message: `Please confirm your PayPal payment of ${amount}.`,
      confirmation_url: confirmationUrl,
    };
    
    try {
      await emailjs.send('service_al8u5gq', 'template_qiji32t', templateParams, 'T1-lD4rd0KGN9IXnJ');
      Swal.fire({
        title: 'Email Sent!',
        text: `A confirmation email has been sent to ${email}. Please check your email to confirm the payment.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setIsPayPalConfirmed(true);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error sending confirmation email. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
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
          <h2 className="text-2xl font-bold">Book Your Stay</h2>
          <p className="text-gray-600">Please fill in the form below to proceed with your booking.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="room-name" className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Destination Name
            </label>
            <input
              id="room-name"
              name="name"
              type="text"
              readOnly
              value={name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="room-price" className="flex items-center">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Price
            </label>
            <input
              id="room-price"
              name="price"
              type="text"
              readOnly
              value={price}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="check-in" className="flex items-center">
                Check In
              </label>
              <input
                id="check-in"
                name="check-in"
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="check-out" className="flex items-center">
                Check Out
              </label>
              <input
                id="check-out"
                name="check-out"
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="adults" className="flex items-center">
                Adults
              </label>
              <select
                id="adults"
                name="adults"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="children" className="flex items-center">
                Children
              </label>
              <select
                id="children"
                name="children"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="last-name" className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="flex items-center">
              <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Address"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="city" className="flex items-center">
                <FontAwesomeIcon icon={faCity} className="mr-2" />
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="City"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="state" className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="State"
              />
            </div>
          </div>
          <div>
            <label htmlFor="zip" className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Zip Code
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Zip Code"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="phone" className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="flex items-center">
                <FontAwesomeIcon icon={faMailBulk} className="mr-2" />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="payment-method" className="flex items-center">
              Payment Method
            </label>
            <select
              id="payment-method"
              name="payment-method"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={handlePaymentMethodChange}
            >
              <option value="">Select Payment Method</option>
              <option value="GCash">GCash</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          {paymentMethod && (
            <div>
              <label htmlFor="down-payment" className="flex items-center">
                Down Payment Amount
              </label>
              <input
                id="down-payment"
                name="down-payment"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Down Payment Amount"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'GCash' && (
            <div>
              <label htmlFor="gcash-number" className="flex items-center">
                GCash Number
              </label>
              <input
                id="gcash-number"
                name="payment-details"
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
                Get OTP
              </button>
              <label htmlFor="otp" className="flex items-center mt-4">
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
          )}
          {paymentMethod === 'PayPal' && (
            <div>
              <label htmlFor="paypal-email" className="flex items-center">
                PayPal Email
              </label>
              <input
                id="paypal-email"
                name="payment-details"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="PayPal Email"
              />
              <button
                type="button"
                onClick={() => handlePayPalConfirm((document.getElementById('paypal-email') as HTMLInputElement).value,(downPayment))}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-2"
              >
                Confirm
              </button>
            </div>
          )}
          <input
            id="bookedby"
            name="bookedby"
            type="hidden"
            value={user?.uid}
          />
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              disabled={paymentMethod === 'PayPal' && !isPayPalConfirmed}
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BookingFormModal;
