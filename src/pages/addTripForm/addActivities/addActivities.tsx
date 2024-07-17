import React, { useCallback, useRef, useState } from 'react'
import './addActivities.css'
import AddIcon from '@mui/icons-material/Add';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { db, storage } from '../../../data/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

interface ActivityObject {
    caption: string;
    file: File;
    preview: string;
    downloadUrl?: string;
    storagePath?: string;
}

interface AddActivitiesProps {
    ActivityObject: ActivityObject[];
    setActivityObject: React.Dispatch<React.SetStateAction<ActivityObject[]>>;
}

const AddActivities: React.FC<AddActivitiesProps> = ({ActivityObject, setActivityObject}) => {
    //const [ActivityObject, setActivityObject] = useState<ActivityObject[]>([]);
    const [currentCaption, setCurrentCaption] = useState<string>('');
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [currentPreview, setCurrentPreview] = useState<string>('');
    const [addActivityMode, setAddActivityMode] = useState<boolean>(false)

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (newFiles && newFiles[0]) {
            const file = newFiles[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setCurrentFile(file);
                    setCurrentPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }, []);
    

    const handleAddActivityObject = async () => {
        if (currentCaption && currentFile && currentPreview) {
            const storageRef = ref(storage, `images/${currentFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, currentFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                },
                (error) => {
                    console.error('File upload error:', error);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    const newActivityObject: ActivityObject = {
                        caption: currentCaption,
                        file: currentFile,
                        preview: currentPreview,
                        downloadUrl: downloadUrl,
                        storagePath: uploadTask.snapshot.ref.fullPath,
                    };

                    try {
                        setActivityObject((prev) => [...prev, newActivityObject]);
                        setCurrentCaption('');
                        setCurrentFile(null);
                        console.log(newActivityObject)
                        setCurrentPreview('');
                        setAddActivityMode(prevMode => !prevMode)
                    } catch (error) {
                        console.error('Error adding document:', error);
                    }
                }
            );
        } else {
            alert('Please provide both an activity name and a photo.');
        }
    };
    
    const handleRemoveActivity = async (index: number) => {
        const activityToRemove = ActivityObject[index];

        if (activityToRemove.storagePath) {
            const storageRef = ref(storage, activityToRemove.storagePath);
            try {
                //await deleteObject(storageRef);
            } catch (error) {
                console.error('Error deleting file from storage:', error);
            }
        }

        setActivityObject((prev) => prev.filter((_, i) => i !== index));
    };

  return (
    <div className=''>
        <div className='flex space-x-[10px] overflow-auto'>
            <button
                className='flex-1/2 bg-gray-300 hover:bg-gray-500 shadow-sm my-2 w-[130px] h-[184px] flex justify-center items-center rounded-[20px]'
                onClick={() => setAddActivityMode(prevMode => !prevMode)}
                title='Add an Activity'
            >
            <AddIcon sx={{ fontSize: 40 }}/>
            </button>
            {addActivityMode==true &&
            <div className=' flex flex-col w-3/4 space-y-2 justify-center p-2 overflow-y-clip scroll-smooth invisiblescrollbar'>
                <div className='flex w-full space-x-2'>
                    <input
                    className='flex-grow ml-2 mt-1 p-2 border-2 rounded-[10px]'
                    placeholder='Set Activity Name Here'
                    value={currentCaption}
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    />
                    <button
                    className='bg-[#002B4A] py-1 px-2 items-end text-white font-bold rounded-[15px] text-xl drop-shadow-md hover:bg-[#336488]'
                    onClick={handleAddActivityObject}>
                        <AddIcon/>
                    </button>
                </div>
                <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                />
                
            </div>
            }
            {addActivityMode==false && <div className='flex-shrink-0 w-3/4 flex p-2 overflow-x-auto overflow-y-clip scroll-smooth invisiblescrollbar'>
                {ActivityObject.length > 0 && (
                    <div className='flex space-x-2'>
                        {ActivityObject.map((activity, index) => (
                            <div key={index} className='hover:scale-105 ease-in-out duration-300 relative w-[130px] h-[184px]'>
                                <img
                                    src={activity.downloadUrl}
                                    alt={`activity preview ${index}`}
                                    className='w-full h-full object-cover rounded-[20px]'
                                />
                                <div className='absolute bottom-0 left-0 w-full flex justify-center text-center bg-black bg-opacity-50 text-white p-2 rounded-b-[20px] whitespace-normal overflow-hidden'>
                                    {activity.caption}
                                </div>
                                <button
                                    onClick={() => handleRemoveActivity(index)}
                                    className='absolute top-0 right-0 text-white rounded-full p-1 z-10'
                                >
                                    <CancelRoundedIcon className='hover:text-red-400 shadow-md' fontSize='large' />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>}
        </div>
    </div>
  )
}

export default AddActivities
