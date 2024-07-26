import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface TourDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: {
    name: string;
    ratePerPerson: string[];
    inclusions: string[];
    exclusions: string[];
    itinerary: string[];
    whatToExpect: string[];
  };
}

const TourDetailsModal: React.FC<TourDetailsModalProps> = ({ isOpen, onClose, tour }) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{tour.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Rates and Inclusions</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">No of Pax</th>
                <th className="py-2 px-4 border">Rate per Person</th>
                <th className="py-2 px-4 border">Details of the Package</th>
              </tr>
            </thead>
            <tbody>
              {tour.ratePerPerson.map((rate, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{rate}</td>
                  <td className="py-2 px-4 border">Inclusions: {tour.inclusions.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Exclusions / Add-ons</h3>
          <ul className="list-disc list-inside">
            {tour.exclusions.map((exclusion, index) => (
              <li key={index}>{exclusion}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Sample Itinerary</h3>
          <ul className="list-disc list-inside">
            {tour.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">What to Expect</h3>
          <ul className="list-disc list-inside">
            {tour.whatToExpect.map((expectation, index) => (
              <li key={index}>{expectation}</li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TourDetailsModal;
