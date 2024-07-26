// src/pages/profilePage/Account.tsx
import React from 'react';
import Drawer from '../../components/Drawer';
import './Account.css';
import TopBar from '../../components/LandingNavBar';

const Account: React.FC = () => {

  return (
    <div className="app-container">
      <TopBar/>
        <div className="relative ml-[80px] account-page content w-100 h-screen">
          <Drawer />
          <div className="account-content w-full h-full">
            <h1>Account Page</h1>
            <p>This is the Booking page content.</p>
          </div>
        </div>
    </div>
  );
};

export default Account;
