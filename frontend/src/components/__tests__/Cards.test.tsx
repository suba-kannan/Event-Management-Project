// FeatureCards.test.tsx
import { render, screen } from '@testing-library/react';
import FeatureCards from '../Card';
import '@testing-library/jest-dom';

// Mock data for the features
const mockFeatures = [
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

// Test the FeatureCard component
describe('FeatureCards Component', () => {
  test('renders all feature cards', () => {
    render(<FeatureCards />);

    // Check if all feature titles are rendered
    mockFeatures.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });
  });

  test('renders images correctly', () => {
    render(<FeatureCards />);

    mockFeatures.forEach((feature) => {
      const img = screen.getByAltText(feature.title);
      expect(img).toHaveAttribute('src', feature.image);
    });
  });

  test('renders cards with reverse class when reverse prop is true', () => {
    render(<FeatureCards />);

    // Check if the second feature card (reverse prop) has the "reverse" class
    const reverseCard = screen.getByText(mockFeatures[1].title).closest('.feature-card');
    expect(reverseCard).toHaveClass('reverse');
  });

  test('does not add reverse class when reverse prop is not provided', () => {
    render(<FeatureCards />);

    // Check if the first and third feature cards don't have the "reverse" class
    const firstCard = screen.getByText(mockFeatures[0].title).closest('.feature-card');
    const thirdCard = screen.getByText(mockFeatures[2].title).closest('.feature-card');

    expect(firstCard).not.toHaveClass('reverse');
    expect(thirdCard).not.toHaveClass('reverse');
  });
});
