import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileRedirectProps {
  destination: 'explore' | 'dashboard' | 'profile';
}

const ProfileRedirect: React.FC<ProfileRedirectProps> = ({ destination }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role;

    if (destination === 'dashboard') {
      if (role === 'Admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (role === 'Organizer') {
        navigate('/OrganizerDashboard', { replace: true });
      } else if (role === 'User') {
        navigate('/UserDashboard', { replace: true });
      } else {
        navigate('/');
      }
    } else if (destination === 'explore') {
      if (role === 'Organizer') {
        navigate('/OrganizerExplore', { replace: true });
      } else if (role === 'User') {
        navigate('/UserExplore', { replace: true });
      } else {
        navigate('/');
      }
    } else if (destination === 'profile') {
      if (role === 'Organizer') {
        navigate('/OrganizerProfile', { replace: true });
      } else if (role === 'User') {
        navigate('/UserProfile', { replace: true });
      } else {
        navigate('/');
      }
    }
  }, [navigate, destination]);

  return null;
};

export default ProfileRedirect;
