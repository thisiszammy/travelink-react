import React from 'react';
import { Modal } from '@mantine/core';

interface TourDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourDetailsModal: React.FC<TourDetailsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Tour Details">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Itinerary</h2>
        <ul className="list-disc pl-5">
          <li>5:00 AM - Pick up from your hotel</li>
          <li>6:00 AM - Arrival at Oslob</li>
          <li>6:30 AM - Whale Shark Watching</li>
          <li>8:00 AM - Visit Tumalog Falls</li>
          <li>10:00 AM - Proceed to Sumilon Sandbar</li>
          <li>1:00 PM - Lunch</li>
          <li>3:00 PM - Visit Kawasan Falls</li>
          <li>5:00 PM - Departure back to your hotel</li>
        </ul>

        <h2 className="text-2xl font-bold">Inclusions</h2>
        <ul className="list-disc pl-5">
          <li>Private Air-conditioned Transportation</li>
          <li>Driver and Guide</li>
          <li>All Entrance Fees</li>
          <li>Lunch</li>
          <li>Hotel Pick-up and Drop-off</li>
        </ul>

        <h2 className="text-2xl font-bold">Exclusions</h2>
        <ul className="list-disc pl-5">
          <li>Personal Expenses</li>
          <li>Tips and Gratuities</li>
        </ul>

        <h2 className="text-2xl font-bold">Price per PAX</h2>
        <p>Php 5,500</p>
      </div>
    </Modal>
  );
};

export default TourDetailsModal;
