// Author: Khôi Nguyên
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Component phân quyền Route theo vai trò người dùng (Admin = 1, Staff = 2).
 */
export default function RequireRole({ user, allowedRole, redirectTo = '/news' }) {
  if (!user) return <Navigate to="/login" replace />;
  // Nếu vai trò không khớp quyền được phép truy cập, chuyển hướng về trang dự phòng
  if (Number(user.accountRole) !== Number(allowedRole)) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
