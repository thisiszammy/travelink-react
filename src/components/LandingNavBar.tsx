import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faUser, faBars, faTimes, faBook, faMagnifyingGlass, faHouse, faCaretDown, faAddressCard, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../data/firebaseConfig';
import { useAuth } from '../utils/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const TopBar: React.FC = () => {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cebuDropdownOpen, setCebuDropdownOpen] = useState<boolean>(false);
  const [privateToursDropdownOpen, setPrivateToursDropdownOpen] = useState<boolean>(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
    handleMenuClose();
  };

  const handleClick = (path: string) => {
    navigate(path);
    setActiveButton(path);
    setIsOpen(false); // Close the navbar after clicking a link
  };

  return (
    <div className="fixed left-0 top-0 w-full z-20">
      <div className="flex items-center justify-between p-4 bg-transparent text-white fixed w-full z-10">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
        <div className="flex items-center space-x-8">
          <div className="relative">
            <button
              onClick={() => setCebuDropdownOpen(!cebuDropdownOpen)}
              className="bg-transparent text-white hover:text-blue-500 no-underline py-2 px-2 rounded-full focus:outline-none flex items-center"
            >
              Cebu Tours <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </button>
            <AnimatePresence>
              {cebuDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-48 bg-gray-500 text-white rounded shadow-lg"
                >
                  <Link to="/northcebu" className="block px-4 py-2 text-white hover:bg-gray-900 no-underline" onClick={() => setCebuDropdownOpen(false)}>North Cebu</Link>
                  <Link to="/cebucity"  className="block px-4 py-2 text-white hover:bg-gray-900 no-underline" onClick={() => setCebuDropdownOpen(false)}>Cebu City</Link>
                  <Link to="/southcebu" className="block px-4 py-2 text-white hover:bg-gray-900 no-underline" onClick={() => setCebuDropdownOpen(false)}>South Cebu</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <button
              onClick={() => setPrivateToursDropdownOpen(!privateToursDropdownOpen)}
              className="bg-transparent text-white hover:text-blue-500 no-underline py-2 px-2 rounded-full focus:outline-none flex items-center"
            >
              Private Tours <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </button>
            <AnimatePresence>
              {privateToursDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-48 bg-gray-500 text-white rounded shadow-lg"
                >
                  <Link to="/privatetour1" className="block px-2 py-3 text-white hover:bg-gray-900 no-underline" onClick={() => setPrivateToursDropdownOpen(false)}>Whale Shark + Tumalog Falls + Sumilon Sandbar + Kawasan Falls</Link>
                  <Link to="/privatetour2" className="block px-2 py-3 text-white hover:bg-gray-900 no-underline" onClick={() => setPrivateToursDropdownOpen(false)}>Whale Shark + Tumalog Falls + Kawasan Falls + Pescador Island</Link>
                  <Link to="/privatetour3" className="block px-2 py-3 text-white hover:bg-gray-900 no-underline" onClick={() => setPrivateToursDropdownOpen(false)}>Private Twin City Tour with Uphill</Link>
                  <Link to="/privatetour4" className="block px-2 py-3 text-white hover:bg-gray-900 no-underline" onClick={() => setPrivateToursDropdownOpen(false)}>Cebu Safari and Adventure Park Tour</Link>
                  <Link to="/privatetour5" className="block px-2 py-3 text-white hover:bg-gray-900 no-underline" onClick={() => setPrivateToursDropdownOpen(false)}>Bantayan Island Day Tour</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/about" className="bg-transparent text-white hover:text-blue-500 no-underline py-2 px-2 rounded-full">About Us</Link>
          <Link to="/contact" className="bg-transparent text-white hover:text-blue-500 no-underline py-2 px-2 rounded-full">Contact Us</Link>
          <FontAwesomeIcon icon={faBell} className="cursor-pointer text-white hover:text-black" />
          <div className="border-l h-6 border-white mx-2"></div>
          <div className="flex items-center cursor-pointer text-white hover:text-black" onClick={handleMenuOpen}>
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span>{userData?.username || 'Guest'}</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div
        className={`flex flex-col bg-gray-800 bg-opacity-70 p-4 fixed left-0 top-0 h-full transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="text-xl font-bold text-white py-2 px-4 my-2">
          Travelink
        </div>
        <button
          className={`nav-button ${activeButton === '/landing' ? 'bg-blue-500' : ''} text-white py-2 px-4 my-2 rounded flex items-center`}
          onClick={() => handleClick('/landing')}
        >
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <span>Home</span>
        </button>
        <button
          className={`nav-button ${activeButton === '/account' ? 'bg-blue-500' : ''} text-white py-2 px-4 my-2 rounded flex items-center`}
          onClick={() => handleClick('/account')}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <span>Account</span>
        </button>
        <button
          className={`nav-button ${activeButton === '/searchtrip' ? 'bg-blue-500' : ''} text-white py-2 px-4 my-2 rounded flex items-center`}
          onClick={() => handleClick('/searchtrip')}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
          <span>Search</span>
        </button>
        <button
          className={`nav-button ${activeButton === '/booking' ? 'bg-blue-500' : ''} text-white py-2 px-4 my-2 rounded flex items-center`}
          onClick={() => handleClick('/booking')}
        >
          <FontAwesomeIcon icon={faBook} className="mr-2" />
          <span>Booking</span>
        </button>
        <button
          className={`nav-button ${activeButton === '/faq' ? 'bg-blue-500' : ''} text-white py-2 px-4 my-2 rounded flex items-center`}
          onClick={() => handleClick('/faq')}
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          <span>FAQ</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
