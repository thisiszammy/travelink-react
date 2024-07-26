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
import SearchTrip from './pages/searchtripPage/SearchTrip';
import AboutUsContactUs from './pages/about&contactusPage/About&ContactUs';
import UpdateDeleteForm from './pages/UpdateDeleteForm/UpdateDeleteForm';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Account from './pages/profilePage/Account';
import Booking from './pages/profilePage/Booking';
import TopBar from './components/LandingNavBar';
import Drawer from './components/Drawer';
import Hotels from './pages/Hotels';
import Rides from './pages/Rides';
import HotelBookingModal from './pages/HotelBookingModal';
import NorthCebu from './CebuTours/NorthCebu';
import SouthCebu from './CebuTours/SouthCebu';
import CebuCity from './CebuTours/CebuCity';
import Confirm from './pages/Confirmation';
import './App.css';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
          <Route path='/landing' element={<ProtectedRoute element={<Landing />} />} />
          <Route path='/catalog' element={<ProtectedRoute element={<CatalogPage />} />} />
          <Route path='/confirmation' element={<ProtectedRoute element={<Confirm />} />} />
          <Route path='/northcebu'  element={<NorthCebu />} />
          <Route path='/southcebu'  element={<SouthCebu />} />
          <Route path='/cebucity'  element={<CebuCity />} />
          <Route path='/hotels'  element={<Hotels />} />
          <Route path='/rides'  element={<Rides />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/addtripform" element={<ProtectedRoute element={<AddTripForm />} />} />
          <Route path='/searchtrip' element={<ProtectedRoute element={<SearchTrip />} />} /> 
          <Route path='/aboutuscontactus' element={<AboutUsContactUs />} />
          <Route path="/updatedeleteform" element={<ProtectedRoute element={<UpdateDeleteForm />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
