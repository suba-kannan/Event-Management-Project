import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileRedirectProps {
  destination: 'profile' | 'dashboard';
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
        navigate('/organizer-dashboard', { replace: true });
      } else if (role === 'User') {
        navigate('/user-dashboard', { replace: true });
      } else {
        navigate('/');
      }
    } else if (destination === 'profile') {
      if (role === 'Organizer') {
        navigate('/OrganizerProfilePage', { replace: true });
      } else if (role === 'User') {
        navigate('/UserProfilePage', { replace: true });
      } else {
        navigate('/');
      }
    }
  }, [navigate, destination]);

  return null;
};

export default ProfileRedirect;
