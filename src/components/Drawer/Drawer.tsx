// src/components/Drawer.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Drawer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLock, faHistory } from '@fortawesome/free-solid-svg-icons';

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const getButtonClass = (path: string) => {
    return location.pathname === path ? 'drawer-button active' : 'drawer-button';
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleDrawer}>
        {isOpen ? '<' : '>'}
      </button>
      {isOpen && (
        <div className="drawer-content">
            <br></br>
          <button className={getButtonClass('/account/information')} onClick={() => navigate('/account/information')}>
            <FontAwesomeIcon icon={faInfoCircle} className="drawer-icon" />

            Account Information
          </button>
          <br></br>
          <button className={getButtonClass('/account/security')} onClick={() => navigate('/account/security')}>
            <FontAwesomeIcon icon={faLock} className="drawer-icon" />
            
            Password & Security
          </button>
          <br></br>
          <button className={getButtonClass('/account/history')} onClick={() => navigate('/account/history')}>
            <FontAwesomeIcon icon={faHistory} className="drawer-icon" />
            Travel History
          </button>
        </div>
      )}
    </div>
  );
};

export default Drawer;
