// Author: Khôi Nguyên
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Component bảo vệ các Route yêu cầu người dùng phải đăng nhập trước khi truy cập.
 */
export default function RequireAuth({ user }) {
  const location = useLocation();
  // Nếu chưa đăng nhập, chuyển hướng người dùng về trang /login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
