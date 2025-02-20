import React from 'react';
import { Navigate } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <SidebarLayout role={role}>
      {children}
    </SidebarLayout>
  );
}
