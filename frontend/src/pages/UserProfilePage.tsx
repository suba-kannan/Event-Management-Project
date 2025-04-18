import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfilePage.css';

type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: number;
  banner: string;
};

type Booking = {
  id: number;
  participants: number;
  event: Event;
};

type User = {
  id: number;
  name: string;
  email?: string;
};

const UserProfilePage: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  console.log('Loaded user:', user?.name);
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchUserBookings = async () => {
    try {
      if (!user?.id) return;
      const res = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const cancelBooking = async (eventId: number) => {
    try {
      await axios.post('http://localhost:5000/api/bookings/cancel', {
        userId: user?.id,
        eventId,
      });
      setAlert('Booking cancelled successfully.');
      setBookings((prev) => prev.filter((b) => b.event.id !== eventId));
    } catch (error) {
      setAlert('Cancellation failed. Try again.');
      console.error('Cancel error:', error);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {alert && <div className="alert">{alert}</div>}

      {user && (
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          {user.email && <p><strong>Email:</strong> {user.email}</p>}
        </div>
      )}

      <h3>Your Booked Tickets</h3>

      {bookings.length > 0 ? (
        <div className="tickets-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="ticket-card">
              <img src={booking.event.banner} alt={booking.event.name} className="ticket-image" />
              <div className="ticket-content">
                <h4>{booking.event.name}</h4>
                <p><strong>Location:</strong> {booking.event.location}</p>
                <p><strong>Date & Time:</strong> {booking.event.date} | {booking.event.time}</p>
                <p><strong>Participants:</strong> {booking.participants}</p>
                <p><strong>Total Paid:</strong> ₹{booking.event.price * booking.participants}</p>
                <button className="cancel-button" onClick={() => cancelBooking(booking.event.id)}>
                  Cancel Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't booked any events yet.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
