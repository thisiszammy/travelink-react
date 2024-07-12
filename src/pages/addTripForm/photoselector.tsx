import React, { useCallback, useRef, useState } from 'react'
import './photoselector.css'
import AddIcon from '@mui/icons-material/Add';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { storage } from '../../data/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';


export interface PhotoSelectorProps {
    files: FileWithMetadata[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
}

export interface FileWithMetadata {
    file: File;
    preview: string;
    downloadUrl?: string;
    storagePath?: string;
}


const PhotoSelector: React.FC<PhotoSelectorProps> = ({files, setFiles}) => {
    const fileInputReference = useRef<HTMLInputElement | null>(null)
    //const [filePreviews, setFilePreviews] = useState<FileWithMetadata[]>([])

    const handleAddPhotosButton = () => {
        if (fileInputReference.current) {
            fileInputReference.current.click()
        }
    }

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (newFiles) {
            const newFilesArray = Array.from(newFiles);
            newFilesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        const preview = e.target.result as string;

                        const storageRef = ref(storage, `images/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                            },
                            (error) => {
                                console.error('File upload error:', error);
                            },
                            async () => {
                                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                                const fileWithMetadata: FileWithMetadata = {
                                    file,
                                    preview,
                                    downloadUrl,
                                    storagePath: uploadTask.snapshot.ref.fullPath,
                                };
                                //setFilePreviews((prev) => [...prev, fileWithMetadata]);
                                setFiles((prevFiles) => [...prevFiles, fileWithMetadata]);
                            }
                        );
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }, [setFiles]);


    const handleRemoveFile = async (index: number) => {
        //const fileToRemove = filePreviews[index];
        const fileToRemove = files[index];

        if (fileToRemove.storagePath) {
            const storageRef = ref(storage, fileToRemove.storagePath);
            try {
                await deleteObject(storageRef);
            } catch (error) {
                console.error('Error deleting file from storage:', error);
            }
        }

        // Remove from local state
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        //setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };




  return (
    <div className=''>
        <div className='flex space-x-[10px] overflow-auto'>
            <input 
                type="file" 
                ref={fileInputReference}
                onChange={handleFileChange}
                accept='image/*'
                hidden multiple
            />
            <button
                className='flex-1/2 bg-gray-300 hover:bg-gray-500 shadow-sm my-2 w-[130px] h-[184px] flex justify-center items-center rounded-[20px]'
                onClick={handleAddPhotosButton}
                title='Add more Photos'
            >
            <AddIcon sx={{ fontSize: 40 }}/>
            </button>
            <div className='flex-shrink-0 w-3/4 flex p-2 overflow-x-auto overflow-y-clip scroll-smooth invisiblescrollbar'>
                {files.length > 0 && (
                    <div className='flex space-x-2 '>
                        {files.map((fileWithMetadata, index) => (
                            <div key={index} className='hover:scale-105 ease-in-out duration-300 relative w-[130px] h-[184px]'>
                                <img
                                    src={fileWithMetadata.downloadUrl}
                                    alt={`file preview ${index}`}
                                    className=' w-full h-full object-cover rounded-[20px]'
                                />
                                <button 
                                    onClick={() => handleRemoveFile(index)}
                                    className='text-white absolute top-0 right-0 rounded-full p-1 z-10'
                                    style={{ zIndex: 10 }}
                                >
                                    <CancelRoundedIcon className='hover:text-red-400 shadow-md' fontSize='large'/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default PhotoSelector
