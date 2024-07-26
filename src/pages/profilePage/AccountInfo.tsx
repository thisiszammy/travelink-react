import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import Drawer from '../../components/Drawer/Drawer';
import './AccountInfo.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { auth, db, storage } from '../../data/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, updateEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TopBar from '../../components/LandingNavBar';

interface AccountInfo {
  username: string;
  fullName: string;
  email: string;
  contact: {
    phone: string;
  };
  birthdate: Dayjs | null;
  photoURL: string | null;
}

const MySwal = withReactContent(Swal);

const AccountInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    username: "",
    fullName: "",
    email: "",
    contact: {
      phone: ""
    },
    birthdate: null,
    photoURL: null
  });
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is authenticated, UID:", user.uid); // Debug log
        const docRef = doc(db, "users", user.uid);
        try {
          console.log("Fetching data from Firestore for UID:", user.uid); // Debug log
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Fetched data from Firestore: ", data); // Debug log
            setAccountInfo({
              username: data?.username || "",
              fullName: data?.fullName || "",
              email: data?.email || "",
              contact: {
                phone: data?.contact?.phone || ""
              },
              birthdate: data?.birthday ? dayjs(data.birthday) : null,
              photoURL: data?.photoURL || null
            });
            console.log("Updated accountInfo state: ", {
              username: data?.username || "",
              fullName: data?.fullName || "",
              email: data?.email || "",
              contact: {
                phone: data?.contact?.phone || ""
              },
              birthdate: data?.birthday ? dayjs(data.birthday) : null,
              photoURL: data?.photoURL || null
            }); // Debug log
          } else {
            console.log("No such document in Firestore!");
            setAccountInfo({
              username: "",
              fullName: "",
              email: "",
              contact: {
                phone: ""
              },
              birthdate: null,
              photoURL: null
            });
          }
        } catch (error) {
          console.error("Error fetching document from Firestore:", error);
          setAccountInfo({
            username: "",
            fullName: "",
            email: "",
            contact: {
              phone: ""
            },
            birthdate: null,
            photoURL: null
          });
        }
        setLoading(false);
      } else {
        console.log("User is not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAccountInfo(prevState => ({
      ...prevState,
      [name]: value,
      contact: {
        ...prevState.contact,
        [name]: value,
      }
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setAccountInfo(prevState => ({
      ...prevState,
      birthdate: date
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleApplyChangesClick = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      try {
        console.log("Updating document in Firestore for UID:", user.uid); // Debug log
        await updateDoc(docRef, {
          username: accountInfo.username,
          fullName: accountInfo.fullName,
          email: accountInfo.email,
          contact: {
            phone: accountInfo.contact.phone
          },
          birthday: accountInfo.birthdate ? accountInfo.birthdate.toISOString().split('T')[0] : null,
          photoURL: accountInfo.photoURL || null
        });

        console.log("Updating email in Firebase Authentication for UID:", user.uid); // Debug log
        await updateEmail(user, accountInfo.email);

        console.log("Document and email successfully updated");
        setUpdateStatus('success');
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Changes applied successfully!',
          confirmButtonText: 'Done',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      } catch (error) {
        console.error("Error updating document or email:", error);
        setUpdateStatus('error');
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to apply changes.',
          confirmButtonText: 'Try Again',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
    }
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const user = auth.currentUser;
    if (user && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      try {
        console.log("Uploading photo to Firebase Storage for UID:", user.uid); // Debug log
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        setAccountInfo(prevState => ({
          ...prevState,
          photoURL
        }));
        console.log("Photo uploaded successfully:", photoURL); // Debug log
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Photo uploaded successfully!',
          confirmButtonText: 'Done',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      } catch (error) {
        console.error("Error uploading photo:", error);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to upload photo.',
          confirmButtonText: 'Try Again',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
    }
  };



  return (
    <div className="account-info bg-[#336488] h-screen w-full overflow-auto flex flex-col  items-center">
      <Drawer />
      <TopBar/>
      <br></br>
      <h1 className='pt-[75px] text-white'>ACCOUNT INFORMATION</h1>
      <div className="profile-card">
        <div className="profile-picture">
          {accountInfo.photoURL ? (
            <img src={accountInfo.photoURL} alt="Profile" />
          ) : (
            <FontAwesomeIcon icon={faUpload} />
          )}
          <input type="file" onChange={handlePhotoUpload} style={{ display: isEditing ? 'block' : 'none' }} />
        </div>
        <div className="profile-details">
          <h2>{accountInfo.username}</h2>
          {!isEditing && (
            <button className="edit-button" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </div>
      </div>
      <form className="account-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={accountInfo.username}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={accountInfo.fullName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={accountInfo.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Contact Phone
          <input
            type="text"
            name="phone"
            value={accountInfo.contact.phone}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Birthdate
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={accountInfo.birthdate}
              onChange={handleDateChange}
              disabled={!isEditing}
              sx={{
                backgroundColor: '#fff',
                borderRadius: "10px",
              }}
            />
          </LocalizationProvider>
        </label>
        {isEditing && (
          <div className="form-actions">
            <button type="button" className="apply-changes" onClick={handleApplyChangesClick}>
              <FontAwesomeIcon icon={faCheck} /> Apply Changes
            </button>
            <button type="button" className="cancel-changes" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        )}
        {updateStatus === 'success' && <p className="success-message">Changes applied successfully!</p>}
        {updateStatus === 'error' && <p className="error-message">Failed to apply changes.</p>}
      </form>
    </div>
  );
};

export default AccountInfo;
