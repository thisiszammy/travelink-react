// src/pages/profilePage/Booking.tsx
import React, { useEffect, useState } from 'react';
import Drawer from '../../components/Drawer';
import './Booking.css';
import NavigationBar from '../../components/NavigationBar';
import TopBar from '../../components/TopBar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAuth } from '../../utils/AuthContext';
import { Timestamp, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
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
  { id: 'tripid', label: 'Trip ID', minWidth: 170 },
  { id: 'startDate', label: 'Start Date', minWidth: 100 },
  { id: 'endDate', label: 'End Date', minWidth: 100 },
  { id: 'timestamp', label: 'Booked On', minWidth: 100, format: formatDate },
  { id: 'view', label: '', minWidth: 100, },
  { id: 'edit', label: '', minWidth: 100 },
  { id: 'delete', label: '', minWidth: 100 },
];

interface BookingReceipt {
  adults: number,
  bookedby: string,
  children: number,
  docid: string,
  eContact: string,
  eContactName: string,
  email: string,
  endDate: string,
  firstname: string,
  lastname: string,
  phoneNumber: string,
  startDate: string,
  timestamp: Timestamp,
  tripid: string
}

const Booking: React.FC = () => {
  const {user, userData, loading} = useAuth()
  const [bookings, setBookings] = useState<BookingReceipt[]>([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "bookingReceipts"), where("bookedby", "==", user?.uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookings: BookingReceipt[] = []
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data() as BookingReceipt)
      })
      setBookings(bookings)
      console.log(bookings)
    })
    return () => unsubscribe();
  }, [user])

  return (
    <div className="app-container">
      <NavigationBar/>
      <TopBar/>
      <div className='ml-[100px] mt-[50px] p-4 flex justify-center w-full'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className='w-full' sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.align || 'left'}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.docid}>
                {columns.map((column) => {
                  const value = (booking as any)[column.id];
                  return (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.id === 'view' && (
                        <button className='bg-[#002B4A] text-white px-4 py-2 rounded'>View</button>
                      )}
                      {column.id === 'edit' && (
                        <button className='bg-[#336488] text-white px-4 py-2 rounded'>Edit</button>
                      )}
                      {column.id === 'delete' && (
                        <button className='bg-rose-600 text-white px-4 py-2 rounded'>Delete</button>
                      )}
                      {!['view', 'edit', 'delete'].includes(column.id) && (
                        column.format ? column.format(value) : value
                      )}                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </div>
    </div>
  );
};

export default Booking;
