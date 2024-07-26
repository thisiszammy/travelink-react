// src/pages/profilePage/Booking.tsx
import React from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './Booking.css';

const Booking: React.FC = () => {
  return (
    <div>
      <div className="booking-content">
       <Drawer />
      <h1>Booking Page</h1>
      <p>This is the Booking page content.</p>
      </div>
    </div>
  );
};

export default Booking;
