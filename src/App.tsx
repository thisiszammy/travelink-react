import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import ForgotPassword from './pages/passwordRecovery/forgotpassword';
import CatalogPage from './pages/catalogPage/CatalogPage';
import TravelinkAppShell from './components/TravelinkAppShell';
//import { MantineProvider } from '@mantine/core';
import AddTripForm from './pages/addTripForm/AddTripForm';
import Landing from './pages/landingPage/Landing';
import BookingForm from './pages/bookingForm/BookingForm';
import SearchTrip from './pages/searchtripPage/SearchTrip';
import AboutUsContactUs from './pages/about&contactusPage/About&ContactUs';
import UpdateDeleteForm from './pages/UpdateDeleteForm/UpdateDeleteForm';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import NavigationBar from './components/NavigationBar';
//import NavigationBar from './components/NavigationBar/NavigationBar';
import Account from './pages/profilePage/Account';
import Booking from './pages/profilePage/Booking';
import TopBar from './components/TopBar/TopBar';
import Drawer from './components/Drawer/Drawer';
import './App.css';
import AccountInfo from './pages/profilePage/AccountInfo';
import PasswordAndSecurity from './pages/profilePage/PasswordAndSecurity';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
          <Route path='/landing' element={<ProtectedRoute element={<Landing />} />} />
          <Route path='/catalog' element={<ProtectedRoute element={<CatalogPage />} />} />
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
