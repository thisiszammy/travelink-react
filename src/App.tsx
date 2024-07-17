import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import ForgotPassword from './pages/passwordRecovery/forgotpassword';
import CatalogPage from './pages/catalogPage/CatalogPage';
import TravelinkAppShell from './components/TravelinkAppShell';
import { MantineProvider } from '@mantine/core';
import AddTripForm from './pages/addTripForm/AddTripForm';
import Landing from './pages/landingPage/Landing';
import BookingForm from './pages/bookingForm/BookingForm';
import UpdateDeleteForm from './pages/UpdateDeleteForm/UpdateDeleteForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/landing' element={<Landing />} />
        <Route path='/catalog' />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/addtripform" element={<AddTripForm />} />
        <Route path="/updatedeleteform" element={<UpdateDeleteForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;