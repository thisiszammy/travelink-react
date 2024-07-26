import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Drawer from '../../components/Drawer/Drawer';
import './AccountInfo.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface AccountInfo {
  username: string;
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  birthdate: Dayjs | null;
}

const AccountInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    username: "@farlights",
    name: "Farley Farlights",
    contact: {
      phone: "09923241243",
      email: "farleyfarlights@gmail.com"
    },
    birthdate: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username' || name === 'name') {
      setAccountInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (name === 'phone' || name === 'email') {
      setAccountInfo(prevState => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name]: value
        }
      }));
    }
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

  const handleApplyChangesClick = () => {
    // Add logic to apply changes
    setIsEditing(false);
  };

  return (
    <div className="account-info">
      <Drawer />
      <h1>ACCOUNT INFORMATION</h1>
      <div className="profile-card">
        <div className="profile-picture">
          <img src="your-profile-picture-url" alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{accountInfo.name}</h2>
          <p>{accountInfo.username}</p>
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
          Name
          <input
            type="text"
            name="name"
            value={accountInfo.name}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Contact Info
          <input
            type="text"
            name="phone"
            value={accountInfo.contact.phone}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
          <input
            type="email"
            name="email"
            value={accountInfo.contact.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          Birthdate
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={accountInfo.birthdate}
              onChange={handleDateChange}
              disabled={!isEditing}
              sx={ {
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
      </form>
    </div>
  );
};

export default AccountInfo;
