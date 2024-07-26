import React,{ useState } from 'react'
import bestsummerdestination from '../../res/images/best-summer-destination-1080x567.jpg'
import './BookingForm.css'
import { db } from '../../data/firebaseConfig'
import { Timestamp, addDoc, collection, doc, setDoc, startAfter } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useAuth } from '../../utils/AuthContext'

interface BookingFormProps {
    id: string
    DestinationName: string;
    close: () => void
}

const BookingForm: React.FC<BookingFormProps> = ({id, DestinationName, close}) => {
    const {user, userData, loading} = useAuth()
    const [lastName, setlastName] = useState<string>('')
    const [firstName, setfirstName] = useState<string>('')
    const [email, setEmail] = useState<string>(user?.email || '')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [tripid, setTripid] = useState<string>(id)
    const [destinationName, setDestinationName] = useState<string>(DestinationName)
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>();
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState<string>('')
    const [expiryDate, setExpiryDate] = useState<string>('')
    const [cvv, setCvv] = useState<string>('')
    const [eContactName, setEContactName] = useState<string>('')
    const [eContact, setEContact] = useState<string>('')
    const [errors, setErrors] = useState<Record<string, string | null>>({});

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

        if (!lastName || !firstName || !email || !phoneNumber || !tripid || !startDate || !endDate || !cardNumber || !expiryDate || !cvv){
            setErrors({
                lastName: !lastName ? 'Last name is required' : null,
                firstName: !firstName ? 'First name is required' : null,
                email: !email ? 'Email is required' : null,
                phoneNumber: !phoneNumber ? 'Phone number is required' : null,
                tripid: !tripid ? 'Trip ID is required' : null,
                startDate: !startDate ? 'Start date is required' : null,
                endDate: !endDate ? 'End date is required' : null,
                cardNumber: !cardNumber ? 'Card number to be used for payment is required' : null,
                expiryDate: !expiryDate ? 'Card expiry date is missing' : null,
                cvv: !cvv ? 'CVV is missing' : null,
            })
            console.log("Missing information.", errors)
            setTimeout(() => {
                setErrors({})
            }, 3000)
            return;
        }

        let bookingInformation = {
            bookedby: user?.uid,
            lastname: lastName,
            firstname: firstName,
            email: email,
            phoneNumber: phoneNumber,
            tripid: tripid,
            startDate: startDate,
            endDate: endDate,
            adults: adults,
            children: children,
            eContactName: eContactName,
            eContact: eContact,
            timestamp: Timestamp.now(),
            
        };

        console.log(bookingInformation)
        console.log(errors)
        try {
            const docRef = await addDoc(collection(db, "bookingReceipts"), bookingInformation);
            await setDoc(doc(db, "bookingReceipts", docRef.id), {docid: docRef.id}, {merge:true})
            console.log("Document successfully uploaded with ID:", docRef.id);
            console.log("Document Successfully uploaded")
            Swal.fire({
                title: "Successful!",
                text: "Your trip has been successfully booked.",
                icon: "success"
              });
            setErrors({})
            setlastName('');
            setfirstName('');
            setEmail('');
            setPhoneNumber('');
            //setTripid(''); planning on implementing this after search trip is done implementing. I'm using a default tripid for now for demo purposes
            setStartDate('');
            setEndDate('');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setAdults(1);
            setChildren(0);
            setEContactName('');
            setEContact('');
            close()
        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <div className='flex items-center justify-center w-full h-full bookingform whitespace-nowrap poppins-regular'>
      <div className='w-full h-full flex'>

        <div className='hide-scrollbar bg-gray-200 w-2/3 h-full p-4 rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto overflow-x-hidden transition-all'>
            <h4>Personal Information</h4>
            <div className='flex flex-col'>
                <div className='ml-10 flex items-center'>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">Last Name:</label>
                        <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        className={`${errors['lastName'] ? 'border-rose-600' : 'border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
                        placeholder='e.g. Dela Cruz'
                        />
                    </div>
                    <div className='w-1/2 flex items-center'>
                        <label className="block">First Name:</label>
                        <input
                        type='text'
                        value={firstName}
                        onChange={(e)=> setfirstName(e.target.value)}
                        className={`${errors['firstName'] ? 'border-rose-600' : 'border border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
                        placeholder='e.g. Juan'
                        />
                    </div>
                </div>


                <div className="ml-10 flex mt-2">
                    <div className="flex-1 mr-4 flex items-center">
                        <label>Email Address:</label>
                        <input
                        className={`${errors['email'] ? 'border-rose-600' : 'border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
                        type='email'
                        placeholder="e.g. juandelacruz@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <label>Phone Number:</label>
                        <input
                        className={`${errors['phoneNumber'] ? 'border-rose-600' : 'border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
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
                    value={destinationName}
                    onChange={(e)=>setTripid(e.target.value)}
                    className={`${errors['tripid'] ? 'border-rose-600' : 'border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
                    disabled
                    />
                </div>
                <div className='w-full flex items-center mt-2'>
                    <label className="">Tour Dates:</label>
                    <input 
                        type="date" 
                        className={`${errors['startDate'] ? 'border-rose-600' : 'border-gray-300'} w-1/4 mt-1 p-2 border-2 rounded-[10px]`}
                        min={new Date().toISOString().split('T')[0]}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                    <label>to</label>
                    <input 
                        type="date" 
                        className={`${errors['endDate'] ? 'border-rose-600' : 'border-gray-300'} w-1/4 mt-1 p-2 border-2 rounded-[10px]`}
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
                            className={`w-1/4 mt-1 p-2 border border-gray-300 rounded-[10px]`}
                            value={adults}
                            onChange={(e)=>setAdults(parseInt(e.target.value))}
                            min={1}
                        />
                        <label>Children:</label>
                        <input
                            type='number'
                            className='w-1/4 mt-1 p-2 border border-gray-300 rounded-[10px]'
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
                                className={`${errors['cardNumber'] ? 'border-rose-600' : 'border-gray-300'} w-full mt-1 p-2 border-2 rounded-[10px]`}
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
                                className={`${errors['expiryDate'] ? 'border-rose-600' : 'border-gray-300'} w-1/6 mt-1 p-2 border-2 rounded-[10px] text-center`}
                            />
                            <label className="block">CVV</label>
                            <input
                            type='text'
                            maxLength={3}
                            value={cvv}
                            onChange={handleCvvChange}
                            className={`${errors['cvv'] ? 'border-rose-600' : 'border-gray-300'} w-1/6 mt-1 p-2 border-2 rounded-[10px]`}
                            />
                        </div>
                    </div>
                </div>

            <div className='flex items-center mt-[30px]'><h4>Emergency Contact Information</h4> <label className='ml-2 text-gray-600'>(Optional)</label></div>
            <div className='ml-10 flex items-center'>
                <div className='w-full pr-4 flex flex-col'>
                    <div className='flex items-center'>
                        <label className="block">Contact Name</label>
                        <input
                            type='text'
                            className='w-full mt-1 p-2 border border-gray-300 rounded-[10px]'
                            value={eContactName}
                            onChange={(e)=>setEContactName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center mt-2'>
                        <label className="block">Contact Phone Number/Email</label>
                        <input
                            type='text'
                            className='w-full mt-1 p-2 border border-gray-300 rounded-[10px]'
                            value={eContact}
                            onChange={(e)=> setEContact(e.target.value)}
                        />
                    </div>
                </div>

            </div>

            

            <div className='w-full flex justify-end mt-[30px]'>
                {Object.keys(errors).length > 0 && <div className='w-full flex justify-center items-center text-rose-600 text-lg'>Some information is missing</div>}
                <button
                    className='bg-[#002B4A] py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                    onClick={handleSubmit}
                >
                    Book Now!
                </button>
                {/*<button
                    className='bg-[#9AA5AC] ml-4 py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                    //onClick={handleSubmit}
                >
                    Cancel
                </button>*/}
            </div>
        </div>

        <div
            className='w-full h-auto text-white rounded-tr-[20px] rounded-br-[20px]'
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
