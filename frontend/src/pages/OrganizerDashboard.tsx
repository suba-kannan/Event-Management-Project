import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './OrganizerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faClock, faTag } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

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
let userId:string;
if (userString) {
  const userObj = JSON.parse(userString);
  const decoded: DecodedToken = jwtDecode<DecodedToken>(userObj.token);
  userId = String(decoded.id)
  console.log('User ID:', decoded.id);
} 

const OrganizerDashboard = () => {
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
  const [isEditing, setIsEditing] = useState<number | null>(null); 
  const [editEvent, setEditEvent] = useState<Partial<Event>>({}); 
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const organizerId = userId;

  const fetchOrganizerEvents = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/all`);
      setOrganizerEvents(response.data.events);
      console.log("HELLO",response.data.events);
      
    } catch (err: any) {
      console.error('Error fetching organizer events:', err);
      setError(err.response?.data?.message || 'Failed to fetch events');
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
      const response = await axios.post('http://localhost:5000/api/events/organizer-dashboard', newEvent);
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
      console.error('Error creating event:', err);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/organizer-dashboard/${eventId}`, {
          data: { organizerId: organizerId },
        });
        setMessage('Event deleted successfully');
        setError('');
        fetchOrganizerEvents();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete event');
        console.error('Error deleting event:', err);
      }
    }
  };

  const handleEditClick = (event: Event) => {
    setIsEditing(event.id);
    setEditEvent({ ...event });
  };

  const handleChangeEditEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (isEditing && editEvent.id) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/events/organizer-dashboard/${editEvent.id}`,
          {
            ...editEvent,
            organizerId: userId,
          }
        );
        setMessage(response.data.message || 'Event updated successfully');
        setError('');
        setIsEditing(null);
        setEditEvent({});
        fetchOrganizerEvents();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to update event');
        console.error('Error updating event:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditEvent({});
  };

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreateForm = () => {
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
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const upcomingEvents = organizerEvents.filter(event => event.date >= currentDate);
  const pastEvents = organizerEvents.filter(event => event.date < currentDate);

  const displayedEvents = showPastEvents ? pastEvents : upcomingEvents;

  return (
    <div className="organizer-dashboard with-background">
      <div className="dashboard-content-wrapper">
        <h2>Organizer Dashboard</h2>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}

        {!showCreateForm && (
          <button onClick={handleShowCreateForm} className="create-event-button">Create New Event</button>
        )}

        {showCreateForm && (
          <div className="form-container">
            <h3>Create New Event</h3>
            <form onSubmit={handleSubmitNewEvent} className="new-event-form">
              <div>
                <label htmlFor="name">Event Name:</label>
                <input type="text" id="name" name="name" value={newEvent.name} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" value={newEvent.location} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={newEvent.date} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" value={newEvent.time} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={newEvent.description} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={newEvent.price} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="seatsAvailable">Seats Available:</label>
                <input type="number" id="seatsAvailable" name="seatsAvailable" value={newEvent.seatsAvailable} onChange={handleChangeNewEvent} required />
              </div>
              <div>
                <label htmlFor="banner">Banner URL:</label>
                <input type="text" id="banner" name="banner" value={newEvent.banner} onChange={handleChangeNewEvent} />
              </div>
              <button type="submit">Create Event</button>
              <button type="button" onClick={handleCancelCreateForm} className="cancel-button">
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
              <div key={event.id} className={`event-card ${isEditing === event.id ? 'editing' : ''}`}>
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
                    <FontAwesomeIcon icon={faTag} /> ₹{event.price}
                  </p>
                  <p className="seats">Available Seats: {event.seatsAvailable}</p>
                  <p className="description">{event.description.substring(0, 100)}...</p>
                </div>
                <div className="event-actions">
                  {isEditing === event.id ? (
                    <div className="edit-event-form">
                      <strong>Edit Event</strong>
                      <div>
                        <label htmlFor={`edit-name-${event.id}`}>Name:</label>
                        <input
                          type="text"
                          id={`edit-name-${event.id}`}
                          name="name"
                          value={editEvent.name || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-location-${event.id}`}>Location:</label>
                        <input
                          type="text"
                          id={`edit-location-${event.id}`}
                          name="location"
                          value={editEvent.location || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-date-${event.id}`}>Date:</label>
                        <input
                          type="date"
                          id={`edit-date-${event.id}`}
                          name="date"
                          value={editEvent.date || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-time-${event.id}`}>Time:</label>
                        <input
                          type="time"
                          id={`edit-time-${event.id}`}
                          name="time"
                          value={editEvent.time || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-description-${event.id}`}>Description:</label>
                        <textarea
                          id={`edit-description-${event.id}`}
                          name="description"
                          value={editEvent.description || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-price-${event.id}`}>Price:</label>
                        <input
                          type="number"
                          id={`edit-price-${event.id}`}
                          name="price"
                          value={editEvent.price || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-seatsAvailable-${event.id}`}>
                          Seats Available:
                        </label>
                        <input
                          type="number"
                          id={`edit-seatsAvailable-${event.id}`}
                          name="seatsAvailable"
                          value={editEvent.seatsAvailable || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-banner-${event.id}`}>Banner URL:</label>
                        <input
                          type="text"
                          id={`edit-banner-${event.id}`}
                          name="banner"
                          value={editEvent.banner || ''}
                          onChange={handleChangeEditEvent}
                        />
                      </div>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit} className="cancel-button">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="event-item">
                      <div className="event-actions">
                        <button onClick={() => handleEditClick(event)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;