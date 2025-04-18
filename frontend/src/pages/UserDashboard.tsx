import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: number;
  banner: string;
  seatsAvailable: number;
  availableSeats: number;
};

type User = {
  id: number;
  name: string;
};

const UserDashboard: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [ticket, setTicket] = useState<{ event: Event; participants: number; user: User } | null>(null);

  const storedUser = localStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/all');
        const upcomingEvents = res.data.events.filter((event: Event) => {
          const eventDateTime = new Date(`${event.date}T${event.time}`);
          return eventDateTime > new Date();
        });
  
        setAllEvents(upcomingEvents);
        setFilteredEvents(upcomingEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = allEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.date.toLowerCase().includes(query) ||
        event.time.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  const openRegistrationForm = (event: Event) => {
    if (!user?.id) {
      setAlert('You must be logged in to book an event.');
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setSelectedEvent(event);
    setParticipants(1);
    setShowForm(true);
    setTicket(null);
  };

  const handleBookingSubmit = async () => {
    if (!user || !selectedEvent) return;
  
    if (participants > selectedEvent.availableSeats) {
      setAlert('Not enough seats available.');
      setTimeout(() => setAlert(null), 3000);
      return;
    }
  
    try {
       axios.post('http://localhost:5000/api/bookings/book', {
        userId: user.id,
        eventId: selectedEvent.id,
        participants,
      });
  
      setAllEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, availableSeats: e.availableSeats - participants }
            : e
        )
      );
  
      setTicket({ event: selectedEvent, participants, user });
      setShowForm(false);
      setAlert(`Successfully booked "${selectedEvent.name}"!`);
    } catch (error) {
      setAlert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    }
  
    setTimeout(() => setAlert(null), 3000);
  };
  

  return (
    <div className="container">
      <h2 className="heading">Register Events</h2>

      {alert && <div className="alert">{alert}</div>}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, location, or date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Event Cards */}
      <div className="card-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="card">
              <img src={event.banner} alt={event.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-location">{event.location}</p>
                <p className="card-date">
                  {event.date} | {event.time}
                </p>
                <p className="card-description">{event.description}</p>
                <p className="card-price">Price: ₹{event.price}</p>
                <p className="card-seats">
                  Seats Available: {event.seatsAvailable}
                </p>
                <button
                  onClick={() => openRegistrationForm(event)}
                  className="card-button"
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events found matching your criteria.</p>
        )}
      </div>

      {/* Registration Form */}
      {showForm && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Register for {selectedEvent.name}</h3>
            

            <label>Number of Participants:</label>
            <input
              type="number"
              min={1}
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
            />

            <p>Total Payment: ₹{selectedEvent.price * participants}</p>

            <button onClick={handleBookingSubmit} className="submit-button">
              Pay & Book
            </button>
            <button onClick={() => setShowForm(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Ticket */}
      {ticket && (
  <div className="ticket">
    <h3>Ticket Confirmed</h3>
    <p><strong>Event:</strong> {ticket.event.name}</p>
    <p><strong>Participants:</strong> {ticket.participants}</p>
    <p><strong>Total Paid:</strong> ₹{ticket.event.price * ticket.participants}</p>
    <button
      className="cancel-button"
      onClick={async () => {
        try {
          await axios.post('http://localhost:5000/api/bookings/cancel', {
            userId: ticket.user.id,
            eventId: ticket.event.id,
          });

          setAllEvents((prev) =>
            prev.map((e) =>
              e.id === ticket.event.id
                ? { ...e, availableSeats: e.availableSeats + ticket.participants }
                : e
            )
          );

          setAlert('Booking cancelled successfully.');
          setTicket(null);
        } catch (error) {
          console.error('Cancellation failed:', error);
          setAlert('Cancellation failed. Please try again.');
        }

        setTimeout(() => setAlert(null), 3000);
      }}
    >
      Cancel Booking
    </button>
  </div>
)}

    </div>
  );
};

export default UserDashboard;
