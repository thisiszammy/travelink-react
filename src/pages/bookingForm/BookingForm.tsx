import React,{ useState } from 'react'
import bestsummerdestination from '../../res/images/best-summer-destination-1080x567.jpg'
import './BookingForm.css'
import { db } from '../../../firebaseConfig'

const BookingForm = () => {
    const [cardNumber, setCardNumber] = useState(null)
    const [expiryDate, setExpiryDate] = useState(null)
    const [cvv, setCvv] = useState(null)
    const tripid = 'thisisasampleid123'
    const userEmail = 'sampleuseremail@email.com'


    //@ts-ignore
    const handleExpiryDateChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        if (input.length > 2) {
            input = input.substring(0, 2) + '/' + input.substring(2, 4);
        }

        if (/^\d{0,2}(\/\d{0,2})?$/.test(input)) {
            setExpiryDate(input);
        }
    };
    //@ts-ignore
    const handleCardNumberChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        setCardNumber(input)
    }
    //@ts-ignore
    const handleCvvChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        setCvv(input)
    }
    

  return (
    <div className='flex items-center justify-center w-screen h-screen bookingform whitespace-nowrap poppins-regular'>
      <div className='w-[80%] h-[80%] flex'>

        <div className='bg-white w-full h-full p-6 rounded-tl-[50px] rounded-bl-[50px] overflow-y-auto overflow-x-hidden'>
            <h4>Personal Information</h4>
            <div className='flex flex-col'>
                <div className='ml-10 flex items-center'>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">Last Name:</label>
                        <input
                        type='text'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        placeholder='e.g. Dela Cruz'
                        />
                    </div>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">First Name:</label>
                        <input
                        type='text'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        placeholder='e.g. Juan'
                        />
                    </div>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">Middle Name:</label>
                        <input
                        type='text'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        placeholder='e.g. Castorico'
                        />
                    </div>
                </div>


                <div className="ml-10 flex mt-2">
                    <div className="flex-1 mr-4 flex items-center">
                        <label>Email Address:</label>
                        <input
                        className="w-full mt-1 p-2 border border-gray-300 rounded-[15px]"
                        placeholder="e.g. juandelacruz@gmail.com"
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <label>Phone Number:</label>
                        <input
                        className="w-full mt-1 p-2 border border-gray-300 rounded-[15px]"
                        placeholder="e.g. 09123456789"
                        />
                    </div>
                </div>

            </div>

            <h4 className='mt-[30px]'>Tour Details</h4>
            <div className='ml-10 flex flex-col'>
                <div className='w-full pr-4 flex items-center'>
                    <label className="block">Trip Selection</label>
                    <input
                    type='text'
                    value={tripid}
                    className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                    disabled
                    />
                </div>
                <div className='w-full flex items-center mt-2'>
                    <label className="">Tour Dates:</label>
                    <input 
                        type="date" 
                        className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                        min={new Date().toISOString().split('T')[0]}
                        />
                    <label>to</label>
                    <input 
                        type="date" 
                        className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                        />
                </div>
                <div className='w-full flex flex-col mt-2'>
                    <label className="mt-[10px]">Number of Travelers</label>
                    <div className='w-full ml-[50px] mt-2'>
                        <label>Adults:</label>
                        <input
                            type='number'
                            className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                            min={1}
                        />
                        <label>Children:</label>
                        <input
                            type='number'
                            className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                            min={0}
                        />
                    </div>
                </div>
            </div>
            
            <h4 className='mt-[30px]'>Payment Information</h4>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='w-full pr-4 flex flex-col'>
                        <div className='flex items-center'>
                            <label className="block">Card Number</label>
                            <input
                                type='text'
                                className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                                //@ts-ignore
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />

                        </div>
                        <div className='flex items-center mt-2'>
                            <label className="block">Card Expiry Date</label>
                            <input
                                type="text"
                                //@ts-ignore
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                placeholder="MM/YY"
                                className='w-1/6 mt-1 p-2 border border-gray-300 rounded-[15px] text-center'
                            />
                            <label className="block">CVV</label>
                            <input
                            type='text'
                            maxLength={3}
                            //@ts-ignore
                            value={cvv}
                            onChange={handleCvvChange}
                            className='w-1/6 mt-1 p-2 border border-gray-300 rounded-[15px]'
                            />
                        </div>
                    </div>
                </div>

            <h4 className='mt-[30px]'>Emergency Contact Information</h4>
            <div className='ml-10 flex items-center'>
                <div className='w-full pr-4 flex flex-col'>
                    <div className='flex items-center'>
                        <label className="block">Contact Name</label>
                        <input
                            type='text'
                            className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        />
                    </div>
                    <div className='flex items-center mt-2'>
                        <label className="block">Contact Phone Number/Email</label>
                        <input
                            type='text'
                            className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        />
                    </div>
                </div>

            </div>

            <div className='w-full flex justify-end mt-[50px]'>
                <button
                className='bg-[#002B4A] py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                >
                    Book Now!
                </button>
            </div>
        </div>

        <div
            className='w-full h-full text-white rounded-tr-[50px] rounded-br-[50px]'
            style={{
                backgroundImage: `url(${bestsummerdestination})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
        </div>
      </div>
    </div>
  )
}

export default BookingForm
