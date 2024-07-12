// src/components/Drawer.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Drawer.css';

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleDrawer}>
        {isOpen ? '<' : '>'}
      </button>
      {isOpen && (
        <div className="drawer-content">
          <button onClick={() => navigate('/account/information')}>Account Information</button>
          <button onClick={() => navigate('/account/security')}>Password & Security</button>
          <button onClick={() => navigate(' /account/history')}>Travel History</button>
        </div>
      )}
    </div>
  );
};

export default Drawer;