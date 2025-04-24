import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  const token = user?.token;
  const role = user?.role;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
