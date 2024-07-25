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
            <button
  className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none justify-between"
>
  <span
    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
  >
  </span>
  <span
    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
  >
    Contact Us
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
      ></path>
    </svg>
  </span>
</button>
          </form>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutAndContactUs;
