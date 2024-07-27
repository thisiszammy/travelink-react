// src/components/pages/BookedHotelRooms.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import TopBar from '../components/LandingNavBar';

const BookedHotelRooms: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, 'BookedHotelRooms'));
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel and delete this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'BookedHotelRooms', id));
        setBookings(bookings.filter(booking => booking.id !== id));
        Swal.fire({
          title: 'Success!',
          text: 'Booking canceled successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error canceling booking. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <TopBar />
      <div className="container mx-auto py-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Booked Hotel Rooms</h2>
        {bookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md text-black">
                <div className="mb-4">
                  <strong>Room Name:</strong> {booking.name}
                </div>
                <div className="mb-4">
                  <strong>Price:</strong> {booking.price}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => Swal.fire({
                      title: 'Booking Details',
                      html: `
                        <p><strong>Room Name:</strong> ${booking.name}</p>
                        <p><strong>Price:</strong> ${booking.price}</p>
                        <p><strong>First Name:</strong> ${booking.firstName}</p>
                        <p><strong>Last Name:</strong> ${booking.lastName}</p>
                        <p><strong>Address:</strong> ${booking.address}</p>
                        <p><strong>City:</strong> ${booking.city}</p>
                        <p><strong>State:</strong> ${booking.state}</p>
                        <p><strong>Zip:</strong> ${booking.zip}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Check-in:</strong> ${booking.checkIn}</p>
                        <p><strong>Check-out:</strong> ${booking.checkOut}</p>
                        <p><strong>Adults:</strong> ${booking.adults}</p>
                        <p><strong>Children:</strong> ${booking.children}</p>
                        <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
                        <p><strong>Down Payment:</strong> ${booking.downPayment}</p>
                      `,
                      icon: 'info',
                      confirmButtonText: 'OK',
                    })}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedHotelRooms;
