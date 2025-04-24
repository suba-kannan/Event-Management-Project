import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import './OrganizerExplore.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faClock, faTag } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/Navbar';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  price: number;
  seatsAvailable: number;
  banner: string | null;
}

interface NewEventForm {
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  price: string;
  seatsAvailable: string;
  banner: string;
  organizerId: string;
}

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const userString = localStorage.getItem('user');
let userId: string;
if (userString) {
  const userObj = JSON.parse(userString);
  const decoded: DecodedToken = jwtDecode<DecodedToken>(userObj.token);
  userId = String(decoded.id);
}

const OrganizerExplore = () => {
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    name: '',
    location: '',
    date: '',
    time: '',
    description: '',
    price: '',
    seatsAvailable: '',
    banner: '',
    organizerId: userId,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [organizerEvents, setOrganizerEvents] = useState<Event[]>([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const organizerId = userId;

  const fetchOrganizerEvents = useCallback(async () => {
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token
      
      const response = await axios.get(`http://localhost:5000/api/events/all`,  {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
      });
      setOrganizerEvents(response.data.events);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Failed to fetch events');
      console.error('Error fetching organizer events:', error);
    }
    
  }, [organizerId]);

  useEffect(() => {
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);
  

  const handleChangeNewEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmitNewEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token

      const response = await axios.post('http://localhost:5000/api/events/organizer-dashboard', newEvent, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      setNewEvent({
        name: '',
        location: '',
        date: '',
        time: '',
        description: '',
        price: '',
        seatsAvailable: '',
        banner: '',
        organizerId: userId,
      });
      setShowCreateForm(false);
      fetchOrganizerEvents();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Failed to create event');
      console.error('Error creating event:', error);
    }
  };

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  
  const handleCancelCreateForm = async () => {
    try {
      setShowCreateForm(false);
      setNewEvent({
        name: '',
        location: '',
        date: '',
        time: '',
        description: '',
        price: '',
        seatsAvailable: '',
        banner: '',
        organizerId: userId,
      });
  
      const response = await fetch('http://localhost:5000/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        console.error('Error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  const currentDate = new Date().toISOString().split('T')[0];

  const upcomingEvents = organizerEvents.filter(event => event.date >= currentDate);
  const pastEvents = organizerEvents.filter(event => event.date < currentDate);

  const displayedEvents = showPastEvents ? pastEvents : upcomingEvents;

  return (
    <>
      <Navbar />
      <div className="organizer-dashboard with-background">
        <div className="dashboard-content-wrapper">
          <h2>Create and expolre events</h2>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}

          {!showCreateForm && (
            <button onClick={handleShowCreateForm} className="create-event-button">
              Create New Event
            </button>
          )}

          {showCreateForm && (
            <div className="form-container">
              <h3>Create New Event</h3>
              <form onSubmit={handleSubmitNewEvent} className="new-event-form">
                <div>
                  <label htmlFor="name">Event Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newEvent.name}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newEvent.location}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time">Time:</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newEvent.description}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newEvent.price}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="seatsAvailable">Seats Available:</label>
                  <input
                    type="number"
                    id="seatsAvailable"
                    name="seatsAvailable"
                    value={newEvent.seatsAvailable}
                    onChange={handleChangeNewEvent}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="banner">Banner URL:</label>
                  <input
                    type="text"
                    id="banner"
                    name="banner"
                    value={newEvent.banner}
                    onChange={handleChangeNewEvent}
                  />
                </div>
                <button type="submit">Create Event</button>
                <button
                  type="button"
                  onClick={handleCancelCreateForm}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <h3>Events</h3>
          <div className="events-toggle">
            <button
              className={!showPastEvents ? 'active' : ''}
              onClick={() => setShowPastEvents(false)}
            >
              Upcoming Events
            </button>
            <button
              className={showPastEvents ? 'active' : ''}
              onClick={() => setShowPastEvents(true)}
            >
              Past Events
            </button>
          </div>

          <div className="events-grid">
            {displayedEvents.length === 0 ? (
              <p>No {showPastEvents ? 'past' : 'upcoming'} events.</p>
            ) : (
              displayedEvents.map((event) => (
                <div key={event.id} className="event-card">
                  {event.banner && (
                    <div className="event-banner">
                      <img
                        src={event.banner}
                        alt={event.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).onerror = null;
                          (e.currentTarget as HTMLImageElement).src =
                            'https://via.placeholder.com/300x150?text=No+Image';
                        }}
                      />
                    </div>
                  )}
                  <div className="event-details">
                    <h4>{event.name}</h4>
                    <p className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                    </p>
                    <p className="date">
                      <FontAwesomeIcon icon={faCalendarAlt} /> {event.date}
                    </p>
                    <p className="time">
                      <FontAwesomeIcon icon={faClock} /> {event.time}
                    </p>
                    <p className="price">
                      <FontAwesomeIcon icon={faTag} /> {event.price} USD
                    </p>
                    <p className="seats-available">Seats Available: {event.seatsAvailable}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerExplore;
