import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';

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

const UserDashboard: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Booking[]>([]);

  const fetchUserBookings = async () => {
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token
      if (!user?.id) return;
     
      const res = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`,  {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
      });
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  useEffect(() => {
    const dates = bookings.map((b) => new Date(b.event.date));
    setMarkedDates(dates);
  }, [bookings]);

  const cancelBooking = async (eventId: number) => {
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token
      await axios.post('http://localhost:5000/api/bookings/cancel', {
        userId: user?.id,
        eventId,
      },{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setAlert('Booking cancelled successfully.');
      setBookings((prev) => prev.filter((b) => b.event.id !== eventId));
    } catch (error) {
      setAlert('Cancellation failed. Try again.');
      console.error('Cancel error:', error);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = bookings.filter((booking) => {
      const bookingDate = new Date(booking.event.date);
      return (
        bookingDate.getFullYear() === date.getFullYear() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getDate() === date.getDate()
      );
    });
    setSelectedEvents(eventsOnDate);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const matched = markedDates.some(
        (markedDate) =>
          markedDate.getFullYear() === date.getFullYear() &&
          markedDate.getMonth() === date.getMonth() &&
          markedDate.getDate() === date.getDate()
      );
      return matched ? 'highlight-date' : null;
    }
    return null;
  };

  const handleCalendarToggle = () => {
    setShowCalendar((prev) => !prev);
    if (showCalendar) {
      setSelectedDate(null);
      setSelectedEvents([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>User Dashboard</h2>

        {alert && <div className="alert">{alert}</div>}

        {user && (
          <div className="user-info">
            <p><strong>Name:</strong> {user.name}</p>
            {user.email && <p><strong>Email:</strong> {user.email}</p>}
          </div>
        )}

        <div className="calendar-toggle">
          <button onClick={handleCalendarToggle} className="calendar-btn">
            <FaCalendarAlt className="calendar-icon" /> {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </button>
        </div>

        {showCalendar && (
          <div className="calendar-wrapper">
            <Calendar
              onClickDay={handleDateClick}
              tileClassName={tileClassName}
            />
          </div>
        )}

        {showCalendar && selectedDate && (
          <div className="event-details">
            <h3>Events on {selectedDate.toDateString()}</h3>
            {selectedEvents.length > 0 ? (
              <div className="tickets-container">
                {selectedEvents.map((booking) => (
                  <div key={booking.id} className="ticket-card">
                    <img src={booking.event.banner} alt={booking.event.name} className="ticket-image" />
                    <div className="ticket-content">
                      <h4>{booking.event.name}</h4>
                      <p><strong>Location:</strong> {booking.event.location}</p>
                      <p><strong>Date & Time:</strong> {booking.event.date} | {booking.event.time}</p>
                      <p><strong>Participants:</strong> {booking.participants}</p>
                      <p><strong>Total Paid:</strong> ₹{booking.event.price * booking.participants}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No events booked on this date.</p>
            )}
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
    </>
  );
};

export default UserDashboard;
