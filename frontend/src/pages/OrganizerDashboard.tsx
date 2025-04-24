import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './OrganizerDashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { faMapMarkerAlt, faCalendarAlt, faClock, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar';
import { FaCalendarAlt } from 'react-icons/fa';

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
  organizer: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const OrganizerDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [editEventData, setEditEventData] = useState<Partial<Event>>({});
  const [userId, setUserId] = useState<number | null>(null);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;
        const user = userString ? JSON.parse(userString) : null;
        const token = user.token

        const userObj = JSON.parse(userString);
        const decoded: DecodedToken = jwtDecode(userObj.token);
        setUserId(decoded.id);

        const response = await axios.get(`http://localhost:5000/api/events/all`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const allEvents: Event[] = response.data.events;
        const userEvents = allEvents.filter(event => event.organizer?.id === decoded.id);
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const dates = events.map(e => new Date(e.date));
    setMarkedDates(dates);
  }, [events]);

  const handleDelete = async (eventId: number) => {
    if (!userId) return;
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = userString ? JSON.parse(userString) : null;
    const token = user.token

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/organizer-dashboard/${eventId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setEvents(events.filter(event => event.id !== eventId));
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    }
  };

  const handleEditClick = (event: Event) => {
    setEditEventId(event.id);
    setEditEventData({ ...event });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditEventData({ ...editEventData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (editEventId && userId) {
      try {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const token = user.token

        await axios.put(
          `http://localhost:5000/api/events/organizer-dashboard/${editEventId}`,
          editEventData,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
        setEditEventId(null);
        setEditEventData({});
        const updatedEvents = await axios.get('http://localhost:5000/api/events/all', {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setEvents(updatedEvents.data.events.filter((event: Event) => event.organizer?.id === userId));
      } catch (error) {
        console.error('Failed to update event', error);
      }
    }
  };

  const handleCancelEdit = async () => {
    try {
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
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
    setShowCalendar(prev => !prev);
    if (showCalendar) {
      setSelectedDate(null);
      setSelectedEvents([]);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="organizer-container">
        <h1 className="organizer-heading">Your Created Events</h1>
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
              value={selectedDate || new Date()}
            />
            {selectedDate && (
              <>
                <h3>Events on {selectedDate.toDateString()}</h3>
                <ul className="event-list">
                  {selectedEvents.length === 0 ? (
                    <p>No events on this date.</p>
                  ) : (
                    selectedEvents.map(event => (
                      <li key={event.id} className="eventt-card">
                        <img src={event.banner} alt={event.name} className="eventt-image" />
                        <h4>{event.name}</h4>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}</p>
                        <p><FontAwesomeIcon icon={faCalendarAlt} /> {event.date}</p>
                        <p><FontAwesomeIcon icon={faClock} /> {event.time}</p>
                        <p><FontAwesomeIcon icon={faTag} /> ₹{event.price}</p>
                        <p>Available Seats: {event.seatsAvailable}</p>
                        <p>{event.description.substring(0, 100)}...</p>
                      </li>
                    ))
                  )}
                </ul>
              </>
            )}
          </div>
        )}



        {events.length === 0 ? (
          <p className="no-events">No created events</p>
        ) : (
          <ul className="eventt-list">
            {events.map((event) => (
              <li key={event.id} className="eventt-card">
                {editEventId === event.id ? (
                  <div className="editt-form">
                    <input name="name" value={editEventData.name || ''} onChange={handleEditChange} placeholder="Event Name" />
                    <textarea name="description" value={editEventData.description || ''} onChange={handleEditChange} placeholder="Description" />
                    <input name="location" value={editEventData.location || ''} onChange={handleEditChange} placeholder="Location" />
                    <input name="date" type="date" value={editEventData.date || ''} onChange={handleEditChange} />
                    <input name="time" type="time" value={editEventData.time || ''} onChange={handleEditChange} />
                    <input name="seatsAvailable" type="number" value={editEventData.seatsAvailable || ''} onChange={handleEditChange} />
                    <input name="price" type="number" value={editEventData.price?.toString() || ''} onChange={handleEditChange} />
                    <input name="banner" value={editEventData.banner || ''} onChange={handleEditChange} placeholder="Banner URL" />
                    <div className="editt-actions">
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="eventt-details">
                    <img src={event.banner} alt={event.name} className="eventt-image" />
                    <h4>{event.name}</h4>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}</p>
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> {event.date}</p>
                    <p><FontAwesomeIcon icon={faClock} /> {event.time}</p>
                    <p><FontAwesomeIcon icon={faTag} /> ₹{event.price}</p>
                    <p>Available Seats: {event.seatsAvailable}</p>
                    <p>{event.description.substring(0, 100)}...</p>
                    <div className="eventt-actions">
                      <button onClick={() => handleEditClick(event)}>Edit</button>
                      <button onClick={() => handleDelete(event.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default OrganizerDashboard;
