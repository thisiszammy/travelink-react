import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import cebuBay from '../../res/images/travel2.jpg'; // Replace with your Cebu Bay image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHotel, faPlane, faMapSigns } from '@fortawesome/free-solid-svg-icons';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container2">
      <nav className="navbar navbar-expand-lg navbar-light bg-light2">
        <div className="container-fluid2">
          <a className="navbar-brand2" href="/">
            <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={() => navigate('/login')}>Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="hero-section text-center">
        <div className="hero-content">
          <h1>Travel Where You Want, When You Want</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search for your dream destination..." />
          </div>
        </div>
      </div>
      <div className="categories-section text-center">
        <div className="category-icon">
          <FontAwesomeIcon icon={faUsers} size="2x" />
          <p>Community</p>
        </div>
        <div className="category-icon">
          <FontAwesomeIcon icon={faHotel} size="2x" />
          <p>Hotels</p>
        </div>
        <div className="category-icon">
          <FontAwesomeIcon icon={faPlane} size="2x" />
          <p>Rides</p>
        </div>
        <div className="category-icon">
          <FontAwesomeIcon icon={faMapSigns} size="2x" />
          <p>Trips</p>
        </div>
      </div>
      <div className="places-section text-center">
        <h2>Find Places Near You</h2>
        <div className="place-card">
          <img src={cebuBay} alt="Cebu Bay" className="place-image" />
          <div className="place-info">
            <h3>Cebu Bay</h3>
            <div className="ratings">
              <span>4 ★</span>
              <span>23k ❤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
