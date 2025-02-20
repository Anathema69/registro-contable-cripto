import React from 'react';
import { Navigate } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <SidebarLayout role={role}>
      {children}
    </SidebarLayout>
  );
}
