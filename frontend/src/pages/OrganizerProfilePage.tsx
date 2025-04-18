import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './OrganizerProfilePage.css';

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

const OrganizerProfilePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;

        const userObj = JSON.parse(userString);
        const decoded: DecodedToken = jwtDecode<DecodedToken>(userObj.token);
        const userId = decoded.id;

        const response = await axios.get('http://localhost:5000/api/events/all');
        const allEvents: Event[] = response.data.events;

        const userEvents = allEvents.filter(event => event.organizer?.id === userId);
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="organizer-container">
      <h1 className="organizer-heading">Your Created Events</h1>
      {events.length === 0 ? (
        <p className="no-events">No created events</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-card">
              <img src={event.banner} alt={event.name} className="event-image" />
              <h3 className="event-title">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-location">{event.location}</p>
              <p className="event-date-time">
                {event.date} at {event.time}
              </p>
              <p className="event-price">Price: ₹{event.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrganizerProfilePage;
