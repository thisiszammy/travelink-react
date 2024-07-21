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
      <h1>Booking Page</h1>
      <p>This is the Booking page content.</p>
    </div>
  );
};

export default Booking;
