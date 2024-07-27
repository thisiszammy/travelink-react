import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { useAuth } from '.././utils/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import TopBar from '../components/LandingNavBar';
interface BookingData {
  id: string;
  name: string;
  price: string;
  checkIn: string;
  checkOut: string;
  timestamp: any;
  status: string;
}

const BookingPage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.uid) {
        const q = query(collection(db, 'BookingTours'), where('bookedby', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedBookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as BookingData[];
        setBookings(fetchedBookings);
      }
    };
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'BookingTours', id));
          setBookings(bookings.filter((booking) => booking.id !== id));
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-800">
        <TopBar/>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Trip Name</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Booked On</th>
              <th className="py-2 px-4 border-b">Cancel Trip</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b">{booking.name}</td>
                <td className="py-2 px-4 border-b">{booking.checkIn}</td>
                <td className="py-2 px-4 border-b">{booking.checkOut}</td>
                <td className="py-2 px-4 border-b">₱{booking.price}</td>
                <td className="py-2 px-4 border-b">{new Date(booking.timestamp.toDate()).toLocaleString()}</td>
                <td className="px-12 border-b justify-between">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleCancelBooking(booking.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingPage;
