import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ConfirmBooking = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const amount = params.get('amount');

    if (email && amount) {
      // Logic to confirm the booking (e.g., update the database, send a final confirmation email, etc.)

      Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your booking with a down payment of ${amount} has been confirmed.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid confirmation link.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }, [location]);

  return (
    <div className="confirmation-page">
      <h1>Confirming your booking...</h1>
    </div>
  );
};

export default ConfirmBooking;
