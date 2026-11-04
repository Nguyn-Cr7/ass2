// Author: Khôi Nguyên
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth({ user }) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
