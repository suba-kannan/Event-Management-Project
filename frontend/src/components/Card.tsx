import React from 'react';
import './Card.css';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkTo: string;
  reverse?: boolean;
}

const featuresData: FeatureCardProps[] = [
  {
    title: 'Host virtual events too',
    description:
      'Present memorable events online with our simple built-in conferencing software.',
    image:
      'https://img.freepik.com/premium-photo/excited-young-asian-woman-playing-online-game-smartphone-with-fists-clenched-celebrating-victory-expressing-success_2034-3144.jpg?w=996',
    linkText: 'Create Online Event',
    linkTo: '/create-event',
  },
  {
    title: 'Discover Events Around You',
    description:
      'Explore live concerts, workshops, and meetups near your location.',
    image:
      'https://img.freepik.com/free-photo/close-up-hand-holding-firework-concert_23-2149162981.jpg?t=st=1744445969~exp=1744449569~hmac=7585ec4e085f12066b0e9fa5f65ec7d71df0b6c15487727d73a01b9c2d291207&w=996',
    linkText: 'Explore Events',
    linkTo: '/explore',
    reverse: true,
  },
  {
    title: 'Become an Organizer',
    description:
      'Create, manage, and promote your own events with powerful tools and insights.',
    image:
      'https://img.freepik.com/premium-photo/low-angle-view-woman-holding-umbrella_1048944-9515710.jpg?w=740',
    linkText: 'Start Organizing',
    linkTo: '/create-event',
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  reverse = false,
}) => {
  return (
    <div className={`feature-card ${reverse ? 'reverse' : ''}`}>
      <div className="feature-image">
        <img src={image} alt={title} />
      </div>
      <div className="feature-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const FeatureCards: React.FC = () => {
  return (
    <section className="features-section">
      {featuresData.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
};

export default FeatureCards;
