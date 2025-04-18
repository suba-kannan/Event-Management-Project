import './Feature.css';

const features = [
    {
        title: 'Easy Event Creation',
        description: 'Organizers can create and manage events effortlessly using a simple and intuitive interface.',
        icon: '🎉',
      },
      {
        title: 'Secure Booking',
        description: 'Users can securely book tickets and receive instant confirmations with a smooth experience.',
        icon: '🔒',
      },
      {
        title: 'Role-Based Access',
        description: 'Access and features are tailored based on roles: Admin, Organizer, and User.',
        icon: '👥',
      },
      {
        title: 'Live Event Updates',
        description: 'Stay informed with real-time updates on seat availability and event changes.',
        icon: '📢',
      },
      {
        title: 'Event Analytics',
        description: 'Admins and organizers can view insightful analytics and event performance metrics.',
        icon: '📊',
      },
      {
        title: 'Ticket Generation',
        description: 'After booking, users get a downloadable ticket with event and seat details.',
        icon: '🎫',
      },
];

const Feature = () => {
  return (
    <div className="feature-page">
      <h2 className="feature-heading">Key Features</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-cards" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
