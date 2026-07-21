import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const PrivateRoutes = ({ children, requiredRole }) => (
  <ProtectedRoute requiredRole={requiredRole}>{children}</ProtectedRoute>
);

export default PrivateRoutes;
