import React from 'react';
import './about-contact-us-page.css';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutAndContactUs = () => {
  return (
    <div className="about-contact-us-page container mx-auto p-4">
      <header className="header flex justify-between items-center p-4 bg-blue-800 text-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold">TraveLink</h1>
        <nav className="flex space-x-4">
          <a href="/searchtrip" className="nav-link">Search Trips</a>
          <a href="/about-contact-us" className="nav-link active">About Us & Contact Us</a>
        </nav>
      </header>
      <main className="main mt-4">
        <motion.section
          className="content p-4 bg-white rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-semibold text-2xl mb-4 border-b pb-2">About Us</h2>
          <p className="mb-4">
            Welcome to TraveLink! We are dedicated to helping you find the best travel destinations and experiences.
            Our team of travel experts curates top locations and activities to ensure you have an unforgettable journey.
          </p>
          <p className="mb-4">
            At TraveLink, we believe in making travel accessible and enjoyable for everyone. Our mission is to provide
            reliable and up-to-date information about various destinations, accommodations, and activities around the world.
          </p>
          <p className="mb-4">
            Whether you are looking for a relaxing beach vacation, an adventurous mountain hike, or a cultural city tour,
            TraveLink has got you covered. Join us in exploring the wonders of the world, one trip at a time.
          </p>
          <div className="contact-info mt-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Contact Information</h3>
            <p>Email: travelink@gmail.com</p>
            <p>Phone: +63 997 682 8086</p>
          </div>
        </motion.section>

        <motion.section
          className="content p-4 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-semibold text-2xl mb-4 border-b pb-2">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-lg mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Message</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Send Message
            </button>
          </form>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutAndContactUs;
