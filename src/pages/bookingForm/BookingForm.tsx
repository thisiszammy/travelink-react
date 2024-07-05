import React,{ useState } from 'react'
import bestsummerdestination from '../../res/images/best-summer-destination-1080x567.jpg'
import './BookingForm.css'
import { db } from '../../firebaseConfig'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const BookingForm = () => {
    const [lastName, setlastName] = useState<string>('')
    const [firstName, setfirstName] = useState<string>('')
    const [email, setEmail] = useState<string>('sampleuseremail@email.com')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [tripid, setTripid] = useState<string>('thisisasampleid123')
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>();
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState<string>('')
    const [expiryDate, setExpiryDate] = useState<string>('')
    const [cvv, setCvv] = useState<string>('')
    const [eContactName, setEContactName] = useState<string>('')
    const [eContact, setEContact] = useState<string>('')

    const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        if (input.length > 2) {
            input = input.substring(0, 2) + '/' + input.substring(2, 4);
        }

        if (/^\d{0,2}(\/\d{0,2})?$/.test(input)) {
            setExpiryDate(input);
        }
    };

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        setCardNumber(input)
    }

    const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');

        setCvv(input)
    }

    const handleSubmit = async() => {
        let bookingInformation = {
            docid: '',
            lastname: lastName,
            firstname: firstName,
            email: email,
            phoneNumber: phoneNumber,
            tripid: tripid,
            startDate: startDate,
            endDate: endDate,
            adults: adults,
            children: children,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            eContactName: eContactName,
            eContact: eContact,
        };

        console.log(bookingInformation)
        try {
            const docRef = await addDoc(collection(db, "bookingReceipts"), bookingInformation);
            await setDoc(doc(db, "bookingReceipts", docRef.id), {docid: docRef.id}, {merge:true})
            console.log("Document successfully uploaded with ID:", docRef.id);
            console.log("Document Successfully uploaded")
        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <div className='flex items-center justify-center w-screen h-screen bookingform whitespace-nowrap poppins-regular'>
      <div className='w-[80%] h-[80%] flex'>

        <div className='bg-white w-2/3 h-full p-6 rounded-tl-[50px] rounded-bl-[50px] overflow-y-auto overflow-x-hidden'>
            <h4>Personal Information</h4>
            <div className='flex flex-col'>
                <div className='ml-10 flex items-center'>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">Last Name:</label>
                        <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        placeholder='e.g. Dela Cruz'
                        />
                    </div>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">First Name:</label>
                        <input
                        type='text'
                        value={firstName}
                        onChange={(e)=> setfirstName(e.target.value)}
                        className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                        placeholder='e.g. Juan'
                        />
                    </div>
                </div>


                <div className="ml-10 flex mt-2">
                    <div className="flex-1 mr-4 flex items-center">
                        <label>Email Address:</label>
                        <input
                        className="w-full mt-1 p-2 border border-gray-300 rounded-[15px]"
                        type='email'
                        placeholder="e.g. juandelacruz@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <label>Phone Number:</label>
                        <input
                        className="w-full mt-1 p-2 border border-gray-300 rounded-[15px]"
                        placeholder="e.g. 09123456789"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    onChange={(e)=>setTripid(e.target.value)}
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
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                    <label>to</label>
                    <input 
                        type="date" 
                        className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                        value={endDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                        />
                </div>
                <div className='w-full flex flex-col mt-2'>
                    <label className="mt-[10px]">Number of Travelers</label>
                    <div className='w-full ml-[50px] mt-2'>
                        <label>Adults:</label>
                        <input
                            type='number'
                            className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                            value={adults}
                            onChange={(e)=>setAdults(parseInt(e.target.value))}
                            min={1}
                        />
                        <label>Children:</label>
                        <input
                            type='number'
                            className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[15px]'
                            min={0}
                            value={children}
                            onChange={(e)=>setChildren(parseInt(e.target.value))}
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
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />

                        </div>
                        <div className='flex items-center mt-2'>
                            <label className="block">Card Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                placeholder="MM/YY"
                                className='w-1/6 mt-1 p-2 border border-gray-300 rounded-[15px] text-center'
                            />
                            <label className="block">CVV</label>
                            <input
                            type='text'
                            maxLength={3}
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
                            value={eContactName}
                            onChange={(e)=>setEContactName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center mt-2'>
                        <label className="block">Contact Phone Number/Email</label>
                        <input
                            type='text'
                            className='w-full mt-1 p-2 border border-gray-300 rounded-[15px]'
                            value={eContact}
                            onChange={(e)=> setEContact(e.target.value)}
                        />
                    </div>
                </div>

            </div>

            <div className='w-full flex justify-end mt-[50px]'>
                <button
                className='bg-[#002B4A] py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                onClick={handleSubmit}
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
