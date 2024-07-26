import React, { useEffect, useState } from 'react';
import Drawer from '../../components/Drawer';
import './Booking.css';
import NavigationBar from '../../components/NavigationBar';
//import TopBar from '../../components/TopBar';
import TopBar from '../../components/LandingNavBar';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../utils/AuthContext';
import { Timestamp, collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';
import { DataGrid, GridCellClassNamePropType, GridColDef, GridRenderCellParams, GridRenderRowProps, GridRowClassNameParams } from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import ViewBooking from './ViewBooking';
import Swal from 'sweetalert2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTripForm from '../addTripForm/AddTripForm';

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
  tripid: string,
  status: string
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

const getDestinationPriceByDocId = (docid: string, destinations: Destination[]): string | undefined => {
  const price = destinations.find(dest => dest.docid === docid);
  return price?.Price;
};

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingReceipt[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filter, setFilter] = React.useState(0);
  const [acceptedTrips, setAcceptedTrips] = useState<BookingReceipt[]>([])
  const [completedTrips, setCompletedTrips] = useState<BookingReceipt[]>([])
  const [ongoingTrips, setOngoingTrips] = useState<BookingReceipt[]>([])
  const [pendingTrips, setPendingTrips] = useState<BookingReceipt[]>([])
  const [cancelledTrips, setCancelledTrips] = useState<BookingReceipt[]>([])
  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingReceipt | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>('All Trips')
  const [selectedMode, setSelectedMode] = useState<string>('Guest');
  const [bookedBy, setBookedBy] = useState<string>('')

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (newMode !== null) {
      setSelectedMode(newMode);
    }
  };

  const handleOpen = (booking: BookingReceipt, destination: Destination) => {
    setSelectedBooking(booking);
    setSelectedDestination(destination)
    setOpen(true);
  };

  const handleAddTrip = () => {
    setSelectedButton('AddTrip')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleView = (params: GridRenderCellParams<any>) => {
    const booking = params.row as BookingReceipt;
    const destination = destinations.find(dest => dest.docid === booking.tripid) as Destination;

    setSelectedButton('View')
    handleOpen(booking, destination);
  };

  const handleCancel = async (params: GridRenderCellParams<any>) => {
    const booking = params.row as BookingReceipt;
  
    if (!booking || !booking.docid) {
      console.error('Invalid booking data');
      return;
    }
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });
  
    if (result.isConfirmed) {
      const bookingRef = doc(db, 'bookingReceipts', booking.docid);
  
      try {
        await updateDoc(bookingRef, { status: 'Cancelled' });
        Swal.fire({
          title: 'Cancelled!',
          text: 'The booking has been successfully cancelled.',
          icon: 'success'
        });
        console.log('Document successfully updated');
      } catch (error) {
        console.error('Error updating document: ', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue cancelling the booking. Please try again.',
          icon: 'error'
        });
      }
    }
  };
  

  const Owner: GridColDef[] = [
    { field: 'tripName', headerName: 'Trip Name', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/2, align: 'left'},
    { field: 'bookedBy', headerName: 'Booked By', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/2, align: 'center'},
    { field: 'startDate', headerName: 'Start Date', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    { field: 'endDate', headerName: 'End Date', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    { field: 'price', headerName: 'Price', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    {
      field: 'timestamp',
      headerName: 'Booked On',
      headerClassName: 'text-lg',
      headerAlign: 'center',
      align: 'center',
      flex: 1/2,
      valueFormatter: (value?: Timestamp) => {
        if (value == null) {
          return '';
        }
        return `${formatDate(value)}`;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'text-lg',
      headerAlign: 'center',
      align: 'center',
      flex: 1/2,
      renderCell: (params) => {
        const status = params.value;
        let className = '';
        switch (status) {
          case 'Pending':
            className = 'text-yellow-500 font-semibold';
            break;
          case 'Completed':
            className = 'text-green-500 font-semibold';
            break;
          case 'Ongoing':
            className = 'text-blue-500 font-semibold';
            break;
          case 'Cancelled':
            className = 'text-red-500 font-semibold';  
            break;
          case 'Accepted':
            className = 'text-green-500 font-semibold';  
            break;
          default:
            className = '';
            break;
        }
        return <span className={className}>{status}</span>;
      }
  
    },
    {
      field: 'view',
      headerName: 'View Trip',
      headerClassName: 'text-lg',
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<any>) => (
        <RemoveRedEyeIcon fontSize='large' className='text-[#002B4A] cursor-pointer' onClick={() => handleView(params)}/>
      ),
    },
    {
      field: 'cancel',
      headerName: 'Cancel Trip',
      headerClassName: 'text-lg',
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<any>) => (
        <CancelIcon fontSize='large' className='text-rose-600 cursor-pointer' onClick={() => handleCancel(params)}/>
      ),
    },
  ];

  const Guest: GridColDef[] = [
    { field: 'tripName', headerName: 'Trip Name', headerClassName: 'text-lg', headerAlign: 'center', flex: 1, align: 'left'},
    { field: 'startDate', headerName: 'Start Date', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    { field: 'endDate', headerName: 'End Date', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    { field: 'price', headerName: 'Price', headerClassName: 'text-lg', headerAlign: 'center', flex: 1/4, align: 'center' },
    {
      field: 'timestamp',
      headerName: 'Booked On',
      headerClassName: 'text-lg',
      headerAlign: 'center',
      align: 'center',
      flex: 1/2,
      valueFormatter: (value?: Timestamp) => {
        if (value == null) {
          return '';
        }
        return `${formatDate(value)}`;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'text-lg',
      headerAlign: 'center',
      align: 'center',
      flex: 1/2,
      renderCell: (params) => {
        const status = params.value;
        let className = '';
        switch (status) {
          case 'Pending':
            className = 'text-yellow-500 font-semibold';
            break;
          case 'Completed':
            className = 'text-green-500 font-semibold';
            break;
          case 'Ongoing':
            className = 'text-blue-500 font-semibold';
            break;
          case 'Cancelled':
            className = 'text-red-500 font-semibold';  
            break;
          case 'Accepted':
              className = 'text-green-500 font-semibold';  
              break;
          default:
            className = '';
            break;
        }
        return <span className={className}>{status}</span>;
      }
  
    },
    {
      field: 'view',
      headerName: 'View Trip',
      headerClassName: 'text-lg',
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<any>) => (
        <RemoveRedEyeIcon fontSize='large' className='text-[#002B4A] cursor-pointer' onClick={() => handleView(params)}/>
      ),
    },
    {
      field: 'cancel',
      headerName: 'Cancel Trip',
      headerClassName: 'text-lg',
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<any>) => (
        <CancelIcon fontSize='large' className='text-rose-600 cursor-pointer' onClick={() => handleCancel(params)}/>
      ),
    },
  ];

  useEffect(() => {
    if (!user) return;
  
    const fetchBookingsForOwner = async (destinationIds: string[]) => {
      if (destinationIds.length === 0) {
        setBookings([]);
        setCompletedTrips([]);
        setOngoingTrips([]);
        setPendingTrips([]);
        setCancelledTrips([]);
        return;
      }
  
      const bookingsQuery = query(
        collection(db, 'bookingReceipts'),
        where('tripid', 'in', destinationIds)
      );
  
      const unsubscribeBookings = onSnapshot(bookingsQuery, (querySnapshot) => {
        const allBookings: BookingReceipt[] = [];
        const completed: BookingReceipt[] = [];
        const ongoing: BookingReceipt[] = [];
        const pending: BookingReceipt[] = [];
        const cancelled: BookingReceipt[] = [];
        const accepted: BookingReceipt[] = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data() as BookingReceipt;
          const bookedBy = `${data.lastname}, ${data.firstname}`;
  
          // Create a new object with the bookedBy field
          const bookingWithBookedBy = {
            ...data,
            bookedBy: bookedBy,
          };
  
          allBookings.push(bookingWithBookedBy);
          switch (bookingWithBookedBy.status) {
            case 'Completed':
              completed.push(bookingWithBookedBy);
              break;
            case 'Ongoing':
              ongoing.push(bookingWithBookedBy);
              break;
            case 'Pending':
              pending.push(bookingWithBookedBy);
              break;
            case 'Cancelled':
              cancelled.push(bookingWithBookedBy);
              break;
            case 'Accepted':
              accepted.push(bookingWithBookedBy);
              break;
            default:
              break;
          }
        });
  
        setBookings(allBookings);
        setCompletedTrips(completed);
        setOngoingTrips(ongoing);
        setPendingTrips(pending);
        setCancelledTrips(cancelled);
        setAcceptedTrips(accepted); // Add this line to set the accepted trips
      });
  
      return () => unsubscribeBookings();
    };
  
    if (selectedMode === 'Guest') {
      const destinationsQuery = query(collection(db, 'destinations'));
      const unsubscribeDestinations = onSnapshot(destinationsQuery, (querySnapshot) => {
        const destinations: Destination[] = [];
        querySnapshot.forEach((doc) => {
          destinations.push(doc.data() as Destination);
        });
        setDestinations(destinations);
      });
  
      const bookingsQuery = query(collection(db, 'bookingReceipts'), where('bookedby', '==', user?.uid));
      const unsubscribeBookings = onSnapshot(bookingsQuery, (querySnapshot) => {
        const allBookings: BookingReceipt[] = [];
        const completed: BookingReceipt[] = [];
        const ongoing: BookingReceipt[] = [];
        const pending: BookingReceipt[] = [];
        const cancelled: BookingReceipt[] = [];
        const accepted: BookingReceipt[] = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data() as BookingReceipt;
          const bookedBy = `${data.lastname}, ${data.firstname}`;
  
          // Create a new object with the bookedBy field
          const bookingWithBookedBy = {
            ...data,
            bookedBy: bookedBy,
          };
  
          allBookings.push(bookingWithBookedBy);
          switch (bookingWithBookedBy.status) {
            case 'Completed':
              completed.push(bookingWithBookedBy);
              break;
            case 'Ongoing':
              ongoing.push(bookingWithBookedBy);
              break;
            case 'Pending':
              pending.push(bookingWithBookedBy);
              break;
            case 'Cancelled':
              cancelled.push(bookingWithBookedBy);
              break;
            case 'Accepted':
              accepted.push(bookingWithBookedBy);
              break;
            default:
              break;
          }
        });
  
        setBookings(allBookings);
        setCompletedTrips(completed);
        setOngoingTrips(ongoing);
        setPendingTrips(pending);
        setCancelledTrips(cancelled);
        setAcceptedTrips(accepted); // Add this line to set the accepted trips
      });
  
      return () => {
        unsubscribeBookings();
        unsubscribeDestinations();
      };
    } else if (selectedMode === 'Owner') {
      const destinationsQuery = query(collection(db, 'destinations'), where('owner', '==', user?.uid));
      const unsubscribeDestinations = onSnapshot(destinationsQuery, async (querySnapshot) => {
        const destinations: Destination[] = [];
        const destinationIds: string[] = [];
        querySnapshot.forEach((doc) => {
          const destination = doc.data() as Destination;
          destinations.push(destination);
          destinationIds.push(doc.id);
        });
        setDestinations(destinations);
        await fetchBookingsForOwner(destinationIds);
      });
  
      return () => unsubscribeDestinations();
    }
  }, [user, selectedMode]);
  
  useEffect(() => {
    setDestinations([]);
    setBookings([]);
    setCompletedTrips([]);
    setOngoingTrips([]);
    setPendingTrips([]);
    setCancelledTrips([]);
    setAcceptedTrips([]); // Add this line to reset accepted trips
  }, [selectedMode]);
  
  let filteredBookings: BookingReceipt[];
  switch (filter) {
    case 1:
      filteredBookings = completedTrips;
      break;
    case 2:
      filteredBookings = ongoingTrips;
      break;
    case 3:
      filteredBookings = pendingTrips;
      break;
    case 4:
      filteredBookings = cancelledTrips;
      break;
    case 5:
      filteredBookings = acceptedTrips; // Add this case for accepted trips
      break;
    default:
      filteredBookings = bookings;
      break;
  }

  const rows = filteredBookings.map((booking) => ({
    ...booking,
    id: booking.docid,
    tripName: getDestinationNameByDocId(booking.tripid, destinations) || booking.tripid,
    price: getDestinationPriceByDocId(booking.tripid, destinations) || booking.tripid,
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  

  return (
    <div className="app-container">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedButton==="View" && <ViewBooking handleClose={handleClose} selectedBooking={selectedBooking} selectedDestination={selectedDestination}/>}
          {selectedButton==="AddTrip" && <AddTripForm handleClose={handleClose}/>}
        </Box>
      </Modal>
      <TopBar />
      <div className='bg-[#EAEEF1] mt-[75px] p-4 flex flex-col justify-center w-full h-[1000px]'>
        <div className='bg-white rounded mb-4 p-4 shadow-md'>
          <div className='rounded flex items-center'>
            <div className='flex items-center flex-1'>
              <h1 className='font-bold text-gray-800'>BOOKED TRIPS</h1>
              <label className='ml-4 text-lg font-semibold text-gray-400'>{bookings.length} {bookings.length==1 ? 'trip' : 'trips'} found</label>
            </div>
            <ToggleButtonGroup
              color="primary"
              value={selectedMode}
              exclusive
              onChange={handleModeChange}
              aria-label="Platform"
            >
              <ToggleButton value="Guest">Guest</ToggleButton>
              <ToggleButton value="Owner">Owner</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className='text-xl mt-2 flex items-center'>
            <Tabs value={filter} onChange={handleChange} className='flex-1'>
              <Tab label="All Trips" />
              <Tab label="Completed" />
              <Tab label="Ongoing" />
              <Tab label="Pending Trips" />
              <Tab label="Cancelled" />
              <Tab label="Accepted" />
            </Tabs>
            {selectedMode==='Owner' &&
            <div className='flex'>
              <button
              className='bg-[#002B4A] hover:bg-[#124076] px-4 py-2 text-white font-semibold rounded items-center text-lg'
              onClick={handleAddTrip}
              >
                <AddCircleOutlineIcon className='mr-2'/> Register New Destination
              </button>
            </div>}
          </div>
        </div>
          <Paper sx={{height: '100%'}}>
            <DataGrid
              rows={rows}
              rowHeight={60}
              columns={selectedMode==='Guest'? Guest : Owner}
              getCellClassName={(params) => `px-4`}
              getRowClassName={(params) => `hover:font-bold text-lg`}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
            />
          </Paper>
      </div>
    </div>
  );
};

export default Booking;