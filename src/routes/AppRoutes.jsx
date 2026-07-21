import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routeConfig from './RouteConfig';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => (
  <Routes>
    {routeConfig.map((route) => {
      const Component = route.component;
      const element = route.private ? (
        <ProtectedRoute requiredRole={route.requiredRole}>
          <Component />
        </ProtectedRoute>
      ) : (
        <Component />
      );

      return <Route key={route.path} path={route.path} element={element} />;
    })}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
