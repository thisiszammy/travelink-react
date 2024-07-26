import React from 'react';
import Topbar from '../components/LandingNavBar'

const faqs = [
  {
    question: "Is there any other group in the car during our tour?",
    answer: "No, the car will be exclusively for your group during the tour."
  },
  {
    question: "Is there additional charge when the pick up is from the airport?",
    answer: "Yes, there is an additional charge for airport pickups."
  },
  {
    question: "Is there additional charge if drop off is at the airport?",
    answer: "Yes, there is an additional charge for airport drop offs."
  },
  {
    question: "How much is the down payment required?",
    answer: "A down payment of 50% is required to confirm your booking."
  },
  {
    question: "Do you accept credit card payments?",
    answer: "Yes, we accept credit card payments."
  },
  {
    question: "What is the best time to call you?",
    answer: "The best time to call us is between 9 AM to 6 PM from Monday to Friday."
  },
  {
    question: "Can we extend our stay in the hotel if we will get your holiday package?",
    answer: "Yes, you can extend your stay in the hotel. Please contact us for more details."
  },
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-gray-600 py-8">
        <Topbar/>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
