import React, { useEffect, useState } from 'react'
import './addtripform.css'
import AddIcon from '@mui/icons-material/Add';
import LeafletMap from './leafletmap/LeafletMap';
import PhotoSelector, {PhotoSelectorProps, FileWithMetadata} from './photoselector';
import AddActivities from './addActivities/addActivities';
import { Checkbox } from '@mui/material';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../data/firebaseConfig';
import Swal from 'sweetalert2'
import { useAuth } from '../../utils/AuthContext';
import TopBar from '../../components/TopBar';


interface LatLng {
  lat: number;
  lng: number;
}

interface ActivityObject {
  caption: string;
  file: File;
  preview: string;
  downloadUrl?: string;
  storagePath?: string;
}

const formatNumberWithCommas = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, '');
  const [integerPart, decimalPart] = numericValue.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};


const AddTripForm = () => {
  const {user, userData, loading} = useAuth()
  const [destinationname, setDestinationName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [featuredPhotos, setFeaturedPhotos] = useState<FileWithMetadata[]>([])
  const [activityObjects, setActivityObjects] = useState<ActivityObject[]>([])
  const [latLng, setLatLng] = useState<LatLng | null>(null);
  const [inclusions, setInclusions] = useState<string[]>([])
  //const [others, setOthers] = useState<string>('');
  const [price, setPrice] = useState<string>('0.00');
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleSetLatLng = (latLng: LatLng) => {
    setLatLng(latLng);
    console.log('LatLng received:', latLng);
  };

  const options = ['Wi-Fi', 'Transportation', 'Accommodation', 'Tour Guide'];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setInclusions((prevInclusions) => [...prevInclusions, value]);
    } else {
      setInclusions((prevInclusions) => prevInclusions.filter((inclusion) => inclusion !== value));
    }
  };

  {/*const handleOthersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOthers(event.target.value);
  };*/}

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatNumberWithCommas(value);
    setPrice(formattedValue);
  };

  const handleSubmit = async() => {
    if(!destinationname || !description || featuredPhotos.length===0 || !latLng || !price || price==='0.00') {
      setErrors({
        destinationname: !destinationname ? 'Destination name is required' : null,
        description: !description ? 'Description is required' : null,
        featuredPhotos: featuredPhotos.length===0 ? 'Featured photos are required' : null,
        //activityObjects: activityObjects.length===0 ? 'Activity objects are required' : null,
        latLng: !latLng ? 'Location coordinates are required' : null,
        price: !price || price==='0.00' ? 'Price is required' : null,
    })
    console.log("Missing information.", errors)
    setTimeout(() => {
        setErrors({})
    }, 3000)
    return;
    }
    
    let destinationInformation = {
      docid: '',
      DestinationName: destinationname,
      Description: description,
      FeaturedPhotos: featuredPhotos.map(({ downloadUrl, storagePath }) => ({
        downloadUrl,
        storagePath
      })),
      Activities: activityObjects.map(({ caption, downloadUrl, storagePath }) => ({
        caption,
        downloadUrl,
        storagePath
      })),
      location: {
        //Lat: latLng.lat,
        //Lng: latLng.lng,
        LocationName: '',
        Region: '',
      }, 
      Inclusions: inclusions,
      Price: price,
      DateAdded: Timestamp.now(),
      owner: user?.uid,
    }
    console.log(destinationInformation)

    try {
      const docRef = await addDoc(collection(db, "destinations"), destinationInformation);
      await setDoc(doc(db, "destinations", docRef.id), {docid: docRef.id}, {merge:true})
      console.log("Document successfully uploaded with ID:", docRef.id);
      console.log("Document Successfully uploaded")
      Swal.fire({
          title: "Successful!",
          text: "Your destination has been successfully registered.",
          icon: "success"
        });
      setErrors({})
      setDestinationName('');
      setDescription('');
      setFeaturedPhotos([]);
      setActivityObjects([]);
      setLatLng(null);
      setInclusions([]);
      setPrice('0.00');
    } catch (error) {
        console.log(error)
    }
  }
  console.log(user, userData)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex w-screen h-screen justify-center items-center addtripform whitespace-nowrap'>
      <div className='flex w-[70vw] h-auto'>
      <TopBar/>
        <div className='flex-1 flex-col bg-white w-1/2 h-auto p-4 space-y-[20px]'>
          <label className='sectionheader'>Destination Overview</label>

          <div className='flex items-center'>
            <label>Destination Name</label>
            <input
              className={`${errors['destinationname'] ? 'border-rose-600' : 'border-gray-300'} w-full ml-2 mt-1 p-2 border-2 rounded-[10px]`}
              value={destinationname}
              onChange={(e)=>setDestinationName(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label>Description</label>
            <textarea 
              className={`${errors['description'] ? 'border-rose-600' : 'border-gray-300'} w-full ml-2 mt-1 p-2 border-2 rounded-[10px] resize-none`}
              rows={5}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <div className='flex'>
              <label className='w-full'>Featured Photos</label>
              {errors['featuredPhotos'] &&
              <div className='text-rose-600'>
                <ErrorRoundedIcon/> 
                <label>You must choose at least one featured photo!</label>
              </div>}
            </div>
            <PhotoSelector files={featuredPhotos} setFiles={setFeaturedPhotos}/>
          </div>

          <div className='flex flex-col'>
            <label>Activities</label>
            <AddActivities ActivityObject={activityObjects} setActivityObject={setActivityObjects}/>
          </div>
        </div>

        <div className='flex-1 flex-col bg-white w-1/2 h-auto p-4 space-y-[20px]'>
          <div className='flex w-full items-center'>
            <label>Location</label>
            <input
                className={`${errors['latLng'] ? 'border-rose-600' : 'border-gray-300'} w-full ml-2 mt-1 p-2 border-2 rounded-[10px]`}
                value={latLng ? `${latLng?.lat}, ${latLng?.lng}` : ''}
                placeholder='Place a pin on the map to set a coordinate.'
                disabled
            />
          </div>

          <div className='w-full h-[50%] border-2 overflow-hidden rounded-[20px]'>
            <LeafletMap setLatLng={handleSetLatLng}/>
          </div>

          <div>
            <label>Inclusions</label>
            <div className='grid grid-cols-3'>
              {options.map((option) => (
                <div key={option} className="flex items-center">
                  <Checkbox
                    value={option}
                    checked={inclusions.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">{option}</label>
                </div>
              ))}
              {/*<div className="flex items-center">
                <label>Others:</label>
                <input
                  className="w-full ml-2 mt-1 p-2 border-2 rounded-[10px]"
                  value={others}
                  onChange={handleOthersChange}
                />
              </div>*/}
            </div>
          </div>

          <label className='sectionheader'>Pricing</label>
          <div className='flex items-center'>
            <label>Set Price</label>
            <input
              className={`${errors['price'] ? 'border-rose-600' : 'border-gray-300'} ml-2 mt-1 p-2 border-2 rounded-[10px]`}
              value={price}
              onChange={handlePriceChange}
            />
          </div>

          <div className='w-full flex justify-end mt-[30px]'>
            {Object.keys(errors).length > 0 && <div className='w-full flex justify-center items-center text-rose-600 text-lg'>The highlighted information are required.</div>}
            <button
              className='bg-[#002B4A] py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
              onClick={handleSubmit}
            >
              Register
            </button>
            <button
                className='bg-[#9AA5AC] ml-4 py-3 px-4 text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                //onClick={handleSubmit}
            >
              Cancel
            </button>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default AddTripForm
