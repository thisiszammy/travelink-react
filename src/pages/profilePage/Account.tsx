// src/pages/profilePage/Account.tsx
import React from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './Account.css';
import NavigationBar from '../../components/NavigationBar';
import TopBar from '../../components/TopBar';

const Account: React.FC = () => {

  return (
    <div className="app-container">
      <NavigationBar/>
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
