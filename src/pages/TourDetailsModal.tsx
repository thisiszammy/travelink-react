import React from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto max-h-[90vh]">
        <div className="text-right mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <h2 className="text-2xl font-bold mb-4">{tour.name}</h2>
        <div className="mb-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">No of Pax</th>
                <th className="py-2 px-4 border-b border-gray-300">Rate per Person</th>
                <th className="py-2 px-4 border-b border-gray-300">Details of the Package</th>
              </tr>
            </thead>
            <tbody>
              {tour.ratePerPerson.map((rate, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{rate}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {index === 0 && (
                      <>
                        <h4 className="font-semibold">Inclusions:</h4>
                        <ul className="list-disc ml-4">
                          {tour.inclusions.map((inclusion, index) => (
                            <li key={index}>{inclusion}</li>
                          ))}
                        </ul>
                        <h4 className="font-semibold mt-2">Exclusions / Add-ons:</h4>
                        <ul className="list-disc ml-4">
                          {tour.exclusions.map((exclusion, index) => (
                            <li key={index}>{exclusion}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-xl mb-2">Sample Itinerary:</h3>
          <ul className="list-disc ml-4">
            {tour.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-xl mb-2">What to Expect</h3>
          <ul className="list-disc ml-4">
            {tour.whatToExpect.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsModal;
