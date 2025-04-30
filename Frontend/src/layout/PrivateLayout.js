import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateLayout = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to sign in if not authenticated
  }

  return <>{children}</>; // Render children (protected routes)
};

export default PrivateLayout;
