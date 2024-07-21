// src/components/TopBar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import './TopBar.css';

const TopBar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logged out');
  };

  return (
    <div className="top-bar">
      <span className="logo">Travelink</span>
      <div className="top-bar-right">
        <FontAwesomeIcon icon={faBell} className="notification-icon" />
        <div className="divider"></div>
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <div className="user-menu" onClick={toggleDropdown}>
          <span className="username">thisiszammy</span>
          <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
