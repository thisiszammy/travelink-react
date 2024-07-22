// src/pages/profilePage/Booking.tsx
import React from 'react';
import Drawer from '../../components/Drawer';
import './Booking.css';
import NavigationBar from '../../components/NavigationBar';
import TopBar from '../../components/TopBar';

const Booking: React.FC = () => {
  return (
    <div className="app-container">
      <NavigationBar/>
      <TopBar/>
      <div className='ml-[100px] mt-[50px] p-4'>
        <h1>Booking Page</h1>
        <p>This is the Booking page content.</p>
      </div>
    </div>
  );
};

export default Booking;
