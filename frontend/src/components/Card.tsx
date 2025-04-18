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

export default FeatureCard;