import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import CatalogPage from './pages/catalogPage/CatalogPage';
import TravelinkAppShell from './components/TravelinkAppShell';
import { MantineProvider } from '@mantine/core';
import Landing from './pages/landingPage/Landing';import BookingForm from './pages/bookingForm/BookingForm';
import AddTripForm from './pages/addTripForm/AddTripForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/landing' element={<Landing />} />
        <Route path='/catalog' />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/addtripform" element={<AddTripForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;