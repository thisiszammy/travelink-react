import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { useAuth } from '../../utils/AuthContext';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

const columns: readonly Column[] = [
  { id: 'name', label: 'Destination Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  { id: 'checkIn', label: 'Check In', minWidth: 100 },
  { id: 'checkOut', label: 'Check Out', minWidth: 100 },
  { id: 'adults', label: 'Adults', minWidth: 100 },
  { id: 'children', label: 'Children', minWidth: 100 },
  { id: 'timestamp', label: 'Booked On', minWidth: 100, format: formatDate },
  { id: 'view', label: '', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 100 },
  { id: 'delete', label: '', minWidth: 100 },
];

interface BookingTours {
  name: string;
  price: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  bookedby: string;
  timestamp: Timestamp;
}

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingTours[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'BookingTours'), where('bookedby', '==', user?.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookings: BookingTours[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data() as BookingTours);
      });
      setBookings(bookings);
      console.log(bookings);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <TopBar />
      <div className="container mx-auto mt-5 px-4">
        <div className="w-full bg-gray-200 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center text-[#003554]">Your Booking</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className="py-2 px-4 bg-[#003554] text-white font-bold text-left"
                      style={{ minWidth: column.minWidth }}
                      align={column.align || 'left'}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                  <tr key={booking.timestamp.toMillis()} className="border-b">
                    {columns.map((column) => {
                      const value = (booking as any)[column.id];
                      return (
                        <td key={column.id} className="py-2 px-4 text-left">
                          {column.id === 'view' && (
                            <button className="bg-[#003554] text-white px-4 py-2 rounded hover:bg-[#005f7a] transition duration-200">
                              View
                            </button>
                          )}
                          {column.id === 'edit' && (
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">
                              Edit
                            </button>
                          )}
                          {column.id === 'delete' && (
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                              Delete
                            </button>
                          )}
                          {!['view', 'edit', 'delete'].includes(column.id) &&
                            (column.format ? column.format(value) : value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="mr-2">Rows per page:</label>
              <select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                className="border p-2 rounded"
              >
                {[10, 25, 100].map((rows) => (
                  <option key={rows} value={rows}>
                    {rows}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-gray-200 rounded mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(bookings.length / rowsPerPage) - 1}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
