import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faMagnifyingGlass, faHouse, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (path: string) => {
    navigate(path);
    setActiveButton(path);
    setIsOpen(false); // Close the navbar after clicking a link
  };

  return (
    <div className="fixed left-0 top-0 w-full z-20">
      <div className="flex justify-between items-center p-4 bg-transparent text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>
      <div
        className={`flex flex-col bg-gray-800 bg-opacity-70 p-4 fixed left-0 top-0 h-full transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
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
      </div>
    </div>
  );
};

export default NavigationBar;
