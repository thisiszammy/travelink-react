// src/components/NavigationBar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (path: string) => {
    navigate(path);
    setActiveButton(path);
  };

  return (
    <div className="navbar">
      <button
        className={`nav-button ${activeButton === '/account' ? 'active' : ''}`}
        onClick={() => handleClick('/account')}
      >
        <div className="nav-icon">
          <FontAwesomeIcon icon={faUser} />
          <span>Account</span>
        </div>
      </button>
      <button
        className={`nav-button ${activeButton === '/account' ? 'active' : ''}`}
        onClick={() => handleClick('/searchtrip')}
      >
        <div className="nav-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </div>
      </button>
      <button
        className={`nav-button ${activeButton === '/booking' ? 'active' : ''}`}
        onClick={() => handleClick('/booking')}
      >
        <div className="nav-icon">
          <FontAwesomeIcon icon={faBook} />
          <span>Booking</span>
        </div>
      </button>
    </div>
  );
};

export default NavigationBar;
