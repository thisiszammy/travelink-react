import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import cebuIsland1 from '../../res/images/cebu1.jpg';
import cebuIsland2 from '../../res/images/cebu2.jpg';
import cebuIsland3 from '../../res/images/cebu3.jpg';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container1">
      <div className="content-container1">
        <div className="left-container1">
          <div className="logo-container1">
            <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
          </div>
          <div className="landing-content1">
            <h1 className="text-center mb-4">Welcome to Travelink</h1>
            <p className="text-center lead">
              Discover the beauty of Cebu Islands. Your adventure begins here!
            </p>
            <div className="image-gallery row">
              <div className="col-md-4">
                <img src={cebuIsland1} alt="Cebu Island 1" className="island-image img-fluid rounded shadow-sm" />
              </div>
              <div className="col-md-4">
                <img src={cebuIsland2} alt="Cebu Island 2" className="island-image img-fluid rounded shadow-sm" />
              </div>
              <div className="col-md-4">
                <img src={cebuIsland3} alt="Cebu Island 3" className="island-image img-fluid rounded shadow-sm" />
              </div>
            </div>
            <button
              className="btn btn-primary mt-4 px-5 py-2"
              onClick={() => navigate('/moretrips')}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
