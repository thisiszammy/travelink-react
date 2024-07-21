import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

import NavigationBar from './components/NavigationBar';
import Account from './pages/profilePage/Account';
import Booking from './pages/profilePage/Booking';
import TopBar from './components/TopBar';
import Drawer from './components/Drawer';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <TopBar />
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/booking" element={<Booking />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/catalog' />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/*<Route path="/bookingform" element={<BookingForm />} />*/}
        <Route path="/addtripform" element={<AddTripForm />} />
        <Route path='/searchtrip' element={<SearchTrip />} /> 
        <Route path='/aboutuscontactus' element={<AboutUsContactUs />} />
        <Route path="/updatedeleteform" element={<UpdateDeleteForm />} />
      </Routes>
    </Router>
  );
};

export default App;
