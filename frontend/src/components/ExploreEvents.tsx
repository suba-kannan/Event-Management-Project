import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreEvents.css';

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


const ExploreEvents: React.FC = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);


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

  

  return (
    <div className="container">
      <h2 className="heading">Explore Events</h2>


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
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events found matching your criteria.</p>
        )}
      </div>

    </div>
  );
};

export default ExploreEvents;