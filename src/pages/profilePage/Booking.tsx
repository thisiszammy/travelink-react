import React, { useEffect, useState } from 'react';
import Drawer from '../../components/Drawer';
import './Booking.css';
import NavigationBar from '../../components/NavigationBar';
import TopBar from '../../components/TopBar';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../utils/AuthContext';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

const columns: GridColDef[] = [
  { field: 'tripName', headerName: 'Trip Name', headerAlign: 'center', flex: 1, align: 'center' },
  { field: 'startDate', headerName: 'Start Date', headerAlign: 'center', width: 150, align: 'center' },
  { field: 'endDate', headerName: 'End Date', headerAlign: 'center', width: 150, align: 'center' },
  {
    field: 'timestamp',
    headerName: 'Booked On',
    headerAlign: 'center',
    flex: 1,
    valueFormatter: (value?: Timestamp) => {
      if (value == null) {
        return '';
      }
      return `${formatDate(value)}`;
    },
  },
  {
    field: 'view',
    headerName: 'View',
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
      <RemoveRedEyeIcon fontSize='large' className='text-[#002B4A] cursor-pointer'/>
    ),
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
      <EditIcon fontSize='large' className='text-[#336488] cursor-pointer'/>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
      <DeleteForeverIcon fontSize='large' className='text-rose-600 cursor-pointer'/>
    ),
  },
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

interface Activity {
  caption: string;
  downloadUrl: string;
  storagePath: string;
}

interface FeaturedPhoto {
  downloadUrl: string;
  storagePath: string;
}

interface Location {
  Lat: number;
  Lng: number;
  LocationName: string;
  Region: string;
}

interface Destination {
  docid: string;
  DestinationName: string;
  Description: string;
  DateAdded: Date;
  Price: string;
  owner: string;
  location: Location;
  Activities: Activity[];
  FeaturedPhotos: FeaturedPhoto[];
  Inclusions: string[];
}

const getDestinationNameByDocId = (docid: string, destinations: Destination[]): string | undefined => {
  const destination = destinations.find(dest => dest.docid === docid);
  return destination?.DestinationName;
};

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingReceipt[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (!user) return;

    const bookingsquery = query(collection(db, "bookingReceipts"), where("bookedby", "==", user?.uid));
    const unsubscribeBookings = onSnapshot(bookingsquery, (querySnapshot) => {
      const bookings: BookingReceipt[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data() as BookingReceipt);
      });
      setBookings(bookings);
    });

    const destinationsquery = query(collection(db, "destinations"));
    const unsubscribedestinations = onSnapshot(destinationsquery, (querySnapshot) => {
      const destinations: Destination[] = [];
      querySnapshot.forEach((doc) => {
        destinations.push(doc.data() as Destination);
      });
      setDestinations(destinations);
    });

    return () => {
      unsubscribeBookings()
      unsubscribedestinations()
    };
  }, [user]);

  const rows = bookings.map((booking) => ({
    ...booking,
    id: booking.docid,
    tripName: getDestinationNameByDocId(booking.tripid, destinations) || booking.tripid,
  }));

  return (
    <div className="app-container">
      <NavigationBar />
      <TopBar />
      <div className='ml-[100px] mt-[50px] p-4 flex flex-col justify-center w-1/2'>
        <div className='text-white mb-2'>
          <h1>BOOKED TRIPS</h1>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <DataGrid
            rows={rows}
            rowHeight={50}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            autoHeight
            disableRowSelectionOnClick
          />
        </Paper>
      </div>
    </div>
  );
};

export default Booking;