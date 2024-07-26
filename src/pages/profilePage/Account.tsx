// src/pages/profilePage/Account.tsx
import React from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './Account.css';

const Account: React.FC = () => {
  return (
    <div className="account-page">
      <Drawer />
      <div className="account-content">
        <h1>Account Page</h1>
        <p>This is the Booking page content.</p>
      </div>
    </div>
  );
};

export default Account;
