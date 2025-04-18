import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feature from '../Feature';

describe('Feature component', () => {
  test('renders heading correctly', () => {
    render(<Feature />);
    const heading = screen.getByText(/key features/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    render(<Feature />);
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(6);
  });

  test('renders correct feature titles and descriptions', () => {
    render(<Feature />);
    
    expect(screen.getByText('Easy Event Creation')).toBeInTheDocument();
    expect(screen.getByText('Secure Booking')).toBeInTheDocument();
    expect(screen.getByText('Role-Based Access')).toBeInTheDocument();
    expect(screen.getByText('Live Event Updates')).toBeInTheDocument();
    expect(screen.getByText('Event Analytics')).toBeInTheDocument();
    expect(screen.getByText('Ticket Generation')).toBeInTheDocument();

    expect(screen.getByText(/Organizers can create and manage events/i)).toBeInTheDocument();
    expect(screen.getByText(/Users can securely book tickets/i)).toBeInTheDocument();
  });

  test('renders feature icons', () => {
    render(<Feature />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('📢')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('🎫')).toBeInTheDocument();
  });
});
