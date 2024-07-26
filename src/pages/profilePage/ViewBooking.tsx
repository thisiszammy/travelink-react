import React, { useState } from 'react'
import './ViewBooking.css'
import CancelIcon from '@mui/icons-material/Cancel';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';
import { useAuth } from '../../utils/AuthContext';


const ViewBooking:React.FC<any> = ({selectedBooking, selectedDestination, handleClose}) => {
    const {user, userData, loading} = useAuth()
    const [status, setStatus] = useState<string>(selectedBooking.status);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus((event.target as HTMLInputElement).value);
    };

    const handleUpdateStatus = async () => {
        try {
          const bookingDocRef = doc(db, "bookingReceipts", selectedBooking.docid);
          await updateDoc(bookingDocRef, { status: status });
          alert("Status updated successfully");
          handleClose()
        } catch (error) {
          console.error("Error updating status: ", error);
          alert("Failed to update status");
        }
      };
      

    console.log("Selected Booking: ",selectedBooking)
    console.log("Selected Destination: ", selectedDestination)
  return (
    <div className='relative flex poppins-regular w-auto h-auto whitespace-nowrap'>
        <CancelIcon onClick={handleClose} className='absolute top-0 right-0 text-red-500 cursor-pointer hover:text-red-300' titleAccess='Close' fontSize='large'/>
        
        <div className='flex-col w-[500px]'>
            <h4 className='mb-2'>Personal Information</h4>
            <div className='text-lg space-y-2 mb-4'>
                <div>
                    <label className='labels'>Name of Booker: </label> <label>{selectedBooking.firstname} {selectedBooking.lastname}</label>
                </div>
                <div>
                    <label className='labels'>Email Address: </label> <label>{selectedBooking.email}</label>
                </div>
                <div>
                    <label className='labels'>Phone Number: </label> <label>{selectedBooking.phoneNumber}</label>
                </div>
            </div>

            <h4 className='mb-2'>Tour Details</h4>
            <div className='text-lg space-y-2 mb-4'>
                <div className=''>
                    <label className='labels'>Destination:</label> <label>{selectedDestination.DestinationName}</label>
                </div>
                <div>
                    <label className='labels'>Tour Dates: </label> <label>{selectedBooking.startDate} to {selectedBooking.endDate}</label>
                </div>
                <div>
                    <label className='labels'>Number of Travelers: </label> <label>{selectedBooking.adults} {selectedBooking.adults===1 ? 'adult' : 'adults'}, {selectedBooking.children} {selectedBooking.children===1 ? 'child' : 'children'}</label>
                </div>
            </div>
            <h4 className='mb-2'>Emergency Contacts</h4>
            <div className='text-lg space-y-2'>
                {selectedBooking.eContactName==='' &&
                    <div>
                        <label className='labels'>Contact Name: </label> <label>Unavailable</label>
                    </div>
                }
                {selectedBooking.eContact==='' &&
                    <div>
                        <label className='labels'>Contact Number/Email: </label> <label>Unavailable</label>
                    </div>
                }
                {(selectedBooking.eContact!=='' || selectedBooking.eContactName!=='') &&
                    <div>
                        <div><label className='labels'>Contact Name: </label> <label>{selectedBooking.eContactName}</label></div>
                        <div><label className='labels'>Contact Number/Email: </label> <label>{selectedBooking.eContact}</label></div>
                    </div>
                }
            </div>
            <div className='mt-4'>
                <label
                    className={`${selectedBooking.status === 'Pending' ? 'bg-yellow-500 px-4 py-2 rounded font-semibold text-xl shadow-md' :
                        selectedBooking.status === 'Completed' ? 'bg-green-500 px-4 py-2 rounded font-semibold text-xl shadow-md' :
                        selectedBooking.status === 'Ongoing' ? 'bg-blue-500 px-4 py-2 rounded font-semibold text-xl shadow-md' :
                        selectedBooking.status === 'Accepted' ? 'bg-green-500 px-4 py-2 rounded font-semibold text-xl shadow-md' :
                        selectedBooking.status === 'Cancelled' ? 'bg-red-500 px-4 py-2 rounded font-semibold text-xl shadow-md' : ''
                    }`}
                >
                    {selectedBooking.status}
                </label>
            </div>
        </div>
        {selectedDestination.owner===user?.uid && <div className='flex flex-col ml-4 w-[300px]'>
            <h4>Change Status</h4>
            <div className='h-full'>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="status"
                        name="status"
                        value={status}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Accepted" control={<Radio />} label="Accepted" />
                        <FormControlLabel value="Ongoing" control={<Radio />} label="Ongoing" />
                        <FormControlLabel value="Cancelled" control={<Radio />} label="Cancelled" />
                        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className='flex w-full justify-end'>
                <button
                className='px-4 py-2 bg-[#002B4A] hover:bg-[#124076] text-white font-semibold rounded'
                onClick={handleUpdateStatus}
                >
                    Save Changes
                </button>
            </div>
        </div>}
        
    </div>
  )
}

export default ViewBooking
