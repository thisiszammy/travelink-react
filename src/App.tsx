import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import CatalogPage from './pages/catalogPage/CatalogPage';
import TravelinkAppShell from './components/TravelinkAppShell';
import { MantineProvider } from '@mantine/core';
import Landing from './pages/landingPage/Landing';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Account from './pages/profilePage/Account';
import Booking from './pages/profilePage/Booking';
import TopBar from './components/TopBar/TopBar';
import Drawer from './components/Drawer/Drawer';
import './App.css';
import AccountInfo from './pages/profilePage/AccountInfo';
import PasswordAndSecurity from './pages/profilePage/PasswordAndSecurity';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
      
          <TopBar />
          <div className="content">
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route path="/account/information" element={<AccountInfo />} />
              <Route path="/account/security" element={<PasswordAndSecurity />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </div>
        </div>
   
    </Router>
  );
};

export default App;
