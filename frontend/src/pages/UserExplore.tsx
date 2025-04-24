import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserExplore.css';
import Navbar from '../components/Navbar';

type Event = {
  remainingTime: string | null;
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: number;
  banner: string;
  seatsAvailable: number;
  category: string;
};

type User = {
  id: number;
  name: string;
};

const UserExplore: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [ticket, setTicket] = useState<{ event: Event; participants: number; user: User } | null>(null);

  const [eventNames, setEventNames] = useState<string[]>([]);
  const [selectedEventName, setSelectedEventName] = useState<string>('');

  const storedUser = localStorage.getItem('user');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const token = user.token;
        const res = await axios.get('http://localhost:5000/api/events/all', {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const upcomingEvents = res.data.events.filter((event: Event) => {
          const eventDateTime = new Date(`${event.date}T${event.time}`);
          return eventDateTime > new Date();
        });

        const eventNamesList = upcomingEvents.map((event: Event) => event.name);
        const uniqueEventNames = Array.from(new Set(eventNamesList)) as string[];

        setEventNames(uniqueEventNames);
        setAllEvents(upcomingEvents);
        setFilteredEvents(upcomingEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredEvents((prevEvents) =>
        prevEvents.map((event) => ({
          ...event,
          remainingTime: getRemainingTime(event),
        }))
      );
    }, 1000);

    return () => clearInterval(interval); 
  }, [filteredEvents]);

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

  const handleEventNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    setSelectedEventName(name);

    const filtered = allEvents.filter((event) =>
      name === '' || event.name === name
    );
    setFilteredEvents(filtered);
  };

  const openRegistrationForm = (event: Event) => {
    if (!user?.id) {
      setAlert('You must be logged in to book an event.');
      setTimeout(() => setAlert(null), 6000);
      return;
    }

    if (event.seatsAvailable <= 0) {
      setAlert('No seats available for this event.');
      setTimeout(() => setAlert(null), 6000);
      return;
    }

    setSelectedEvent(event);
    setParticipants(1);
    setShowForm(true);
    setTicket(null);
  };

  const handleBookingSubmit = async () => {
    if (!user || !selectedEvent) return;

    if (participants > selectedEvent.seatsAvailable) {
      setAlert('Not enough seats available.');
      setTimeout(() => setAlert(null), 6000);
      return;
    }

    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token;
      await axios.post('http://localhost:5000/api/bookings/book', {
        userId: user.id,
        eventId: selectedEvent.id,
        participants,
      }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setFilteredEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, seatsAvailable: e.seatsAvailable - participants }
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

    setTimeout(() => setAlert(null), 6000);
  };

  const getRemainingTime = (event: Event) => {
    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const now = new Date();
    const diff = eventDateTime.getTime() - now.getTime();
    if (diff <= 0) return null;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="heading">Explore and Register Events</h2>

        {alert && <div className="alert">{alert}</div>}

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
          
          <div className="event-name-dropdown">
            <select value={selectedEventName} onChange={handleEventNameChange}>
              <option value="">All Events</option>
              {eventNames.length > 0 ? (
                eventNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))
              ) : (
                <option>No events available</option>
              )}
            </select>
          </div>
        </div>

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

                  <p className="card-countdown">
                    {event.remainingTime ? (
                      `Time Left: ${event.remainingTime}`
                    ) : (
                      'Event has started'
                    )}
                  </p>
                  <button
                    onClick={() => openRegistrationForm(event)}
                    className="card-button"
                    disabled={event.seatsAvailable <= 0}
                  >
                    {event.seatsAvailable <= 0 ? 'Sold Out' : 'Register'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No events found matching your criteria.</p>
          )}
        </div>

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
                  const userString = localStorage.getItem('user');
                  const user = userString ? JSON.parse(userString) : null;
                  const token = user.token;
                  console.log("TOKEN", token);
                  await axios.post('http://localhost:5000/api/bookings/cancel', {
                    userId: ticket.user.id,
                    eventId: ticket.event.id,
                  }, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  });

                  setAllEvents((prev) =>
                    prev.map((e) =>
                      e.id === ticket.event.id
                        ? { ...e, seatsAvailable: e.seatsAvailable + ticket.participants }
                        : e
                    )
                  );

                  setAlert('Booking cancelled successfully.');
                  setTicket(null);
                } catch (error) {
                  console.error('Cancellation failed:', error);
                  setAlert('Cancellation failed. Please try again.');
                }

                setTimeout(() => setAlert(null), 6000);
              }}
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserExplore;
